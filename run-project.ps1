$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$apiDir = Join-Path $root 'apps\api'
$webDir = Join-Path $root 'apps\web'
$aiDir = Join-Path $root 'apps\ai'
$logDir = Join-Path $root 'logs'
New-Item -ItemType Directory -Path $logDir -Force | Out-Null

function Ensure-NodeDeps($folder) {
    $nodeModules = Join-Path $folder 'node_modules'
    if (-not (Test-Path $nodeModules)) {
        Write-Host "Installing Node dependencies in $folder..."
        Push-Location $folder
        try {
            npm install --silent
        }
        finally {
            Pop-Location
        }
    }
}

function Ensure-PythonEnv($folder) {
    $venvPath = Join-Path $folder '.venv'
    if (-not (Test-Path $venvPath)) {
        Write-Host "Creating Python virtual environment in $folder..."
        Push-Location $folder
        try {
            py -m venv .venv
        }
        finally {
            Pop-Location
        }
    }

    $activateScript = Join-Path $venvPath 'Scripts\Activate.ps1'
    if (-not (Test-Path $activateScript)) {
        throw "Python virtual environment is missing activation script: $activateScript"
    }

    $requirements = Join-Path $folder 'requirements.txt'
    if (Test-Path $requirements) {
        Write-Host "Installing Python dependencies in $folder..."
        Push-Location $folder
        try {
            & $activateScript
            python -m pip install -r requirements.txt
        }
        finally {
            Pop-Location
        }
    }
}

function Clear-StalePort($port) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($connection in $connections) {
        $procId = $connection.OwningProcess
        if ($procId) {
            try {
                $process = Get-Process -Id $procId -ErrorAction Stop
                if ($process.ProcessName -eq 'node' -or $process.ProcessName -eq 'python') {
                    Stop-Process -Id $procId -Force -ErrorAction Stop
                    Write-Host "Stopped stale $($process.ProcessName) process $procId on port $port" -ForegroundColor Yellow
                }
            }
            catch {
                # ignore cleanup failures and continue
            }
        }
    }
}

function Test-Service($check) {
    foreach ($url in $check.Urls) {
        try {
            $conn = Test-NetConnection -ComputerName localhost -Port $check.Port -WarningAction SilentlyContinue
            if (-not $conn.TcpTestSucceeded) {
                continue
            }

            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 8
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
                return @{ Healthy = $true; Url = $url; Message = "status $($response.StatusCode)" }
            }
        }
        catch {
            continue
        }
    }

    return @{ Healthy = $false; Url = $check.Urls[0]; Message = "no route responded on $($check.Port)" }
}

Write-Host 'Verifying dependencies...'
Ensure-NodeDeps $apiDir
Ensure-NodeDeps $webDir
Ensure-PythonEnv $aiDir

Clear-StalePort 5000
Clear-StalePort 5173
Clear-StalePort 5174
Clear-StalePort 8000

Write-Host "Starting API..."
$apiLog = Join-Path $logDir 'api.log'
Start-Process -FilePath 'powershell' -WorkingDirectory $apiDir -ArgumentList @('-NoExit','-NoLogo','-ExecutionPolicy','Bypass','-Command', "npm run start 2>&1 | Tee-Object -FilePath '$apiLog'") | Out-Null

Write-Host "Starting Web app..."
$webLog = Join-Path $logDir 'web.log'
Start-Process -FilePath 'powershell' -WorkingDirectory $webDir -ArgumentList @('-NoExit','-NoLogo','-ExecutionPolicy','Bypass','-Command', "npx vite --host 0.0.0.0 --port 5173 --strictPort --clearScreen false 2>&1 | Tee-Object -FilePath '$webLog'") | Out-Null

Write-Host "Starting AI service..."
$aiLog = Join-Path $logDir 'ai.log'
Start-Process -FilePath 'powershell' -WorkingDirectory $aiDir -ArgumentList @('-NoExit','-NoLogo','-ExecutionPolicy','Bypass','-Command', ". .\.venv\Scripts\Activate.ps1; uvicorn app.main:app --host 0.0.0.0 --port 8000 2>&1 | Tee-Object -FilePath '$aiLog'") | Out-Null

Write-Host ''
Write-Host 'Waiting for services to initialize...'
Start-Sleep -Seconds 20

$checks = @(
    @{ Name = 'API'; Urls = @('http://localhost:5000/docs'); Port = 5000 },
    @{ Name = 'Web'; Urls = @('http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'); Port = 5173 },
    @{ Name = 'AI'; Urls = @('http://localhost:8000/health'); Port = 8000 }
)

$bad = @()
foreach ($check in $checks) {
    $result = Test-Service $check
    if ($result.Healthy) {
        Write-Host ("[{0}] OK: {1} - {2}" -f $check.Name, $result.Url, $result.Message)
    }
    else {
        Write-Host ("[{0}] NOT READY: {1}" -f $check.Name, $result.Message) -ForegroundColor Yellow
        $bad += $check.Name
    }
}

if ($bad.Count -gt 0) {
    Write-Host ''
    Write-Host 'One or more services did not start correctly.' -ForegroundColor Red
    Write-Host 'Check the service console windows or the log files below:' -ForegroundColor Yellow
    foreach ($name in $bad) {
        Write-Host "  - $name"
    }
    Write-Host "  - $apiLog"
    Write-Host "  - $webLog"
    Write-Host "  - $aiLog"
    Write-Host ''
    Write-Host 'Manual commands:'
    Write-Host "  API:    cd '$apiDir'; npm run start"
    Write-Host "  Web:    cd '$webDir'; npx vite --host 0.0.0.0 --port 5173 --strictPort"
    Write-Host "  AI:     cd '$aiDir'; .\.venv\Scripts\Activate.ps1; uvicorn app.main:app --host 0.0.0.0 --port 8000"
    exit 1
}

Write-Host ''
Write-Host 'All three services are responding.' -ForegroundColor Green
Write-Host 'Opening the app in the browser...'
$webUrl = 'http://localhost:5173'
foreach ($candidate in @('http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175')) {
    try {
        $probe = Invoke-WebRequest -Uri $candidate -UseBasicParsing -TimeoutSec 4
        if ($probe.StatusCode -ge 200 -and $probe.StatusCode -lt 400) {
            $webUrl = $candidate
            break
        }
    }
    catch {
        # continue checking other candidate ports
    }
}

foreach ($url in @($webUrl, 'http://localhost:5000/docs', 'http://localhost:8000/health')) {
    try {
        Start-Process $url
    }
    catch {
        Write-Host "Could not open $url" -ForegroundColor Yellow
    }
}

Write-Host ''
Write-Host 'Project is running.'
Write-Host 'Useful URLs:'
Write-Host "  $webUrl"
Write-Host '  http://localhost:5000/docs'
Write-Host '  http://localhost:8000/health'
Write-Host 'Log files:'
Write-Host "  $apiLog"
Write-Host "  $webLog"
Write-Host "  $aiLog"
