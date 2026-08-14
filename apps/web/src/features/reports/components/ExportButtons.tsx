import {
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import {
  reportsApi,
} from "../api/reports.api";

function downloadBlob(
  blob: Blob,
  filename: string,
) {
  const url =
    window.URL.createObjectURL(
      blob,
    );

  const link =
    document.createElement(
      "a",
    );

  link.href = url;

  link.download =
    filename;

  document.body.appendChild(
    link,
  );

  link.click();

  link.remove();

  window.URL.revokeObjectURL(
    url,
  );
}

export default function ExportButtons() {
  async function handleCsv() {
    const blob =
      await reportsApi.exportCsv();

    downloadBlob(
      blob,
      "reports.csv",
    );
  }

  async function handleExcel() {
    const blob =
      await reportsApi.exportExcel();

    downloadBlob(
      blob,
      "reports.xlsx",
    );
  }

  async function handlePdf() {
    const blob =
      await reportsApi.exportPdf();

    downloadBlob(
      blob,
      "reports.pdf",
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button
        type="button"
        onClick={handleCsv}
        className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-white transition hover:bg-cyan-600"
      >
        <Download size={18} />

        Export CSV
      </button>

      <button
        type="button"
        onClick={handleExcel}
        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700"
      >
        <FileSpreadsheet
          size={18}
        />

        Excel
      </button>

      <button
        type="button"
        onClick={handlePdf}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
      >
        <FileText size={18} />

        PDF
      </button>
    </div>
  );
}