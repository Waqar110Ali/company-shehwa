import httpx
from fastapi import HTTPException

from .config import settings


async def fetch_portfolio_content() -> dict:
    """
    Always fetches the current portfolio content fresh from the NestJS API.
    No caching — this guarantees the assistant reflects the latest saved
    edits immediately, since portfolio.json is small (a few KB at most).
    """
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(settings.portfolio_api_url)
            response.raise_for_status()
            body = response.json()
            return body.get("data", {})
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not reach portfolio content service: {exc}",
        )