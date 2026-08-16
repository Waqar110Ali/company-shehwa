import json

from google import genai
from google.genai import types

from .config import settings
from .schemas import ChatMessageIn

client = genai.Client(api_key=settings.gemini_api_key)


def build_system_prompt(portfolio: dict) -> str:
    portfolio_json = json.dumps(portfolio, ensure_ascii=False, indent=2)

    return f"""You are the AI assistant for this company's website and internal dashboard.

You may ONLY answer questions about the company using the information provided
below — services offered, team members, featured projects, technologies used,
company mission/vision/values, development process, FAQs, testimonials,
statistics, and contact information.

CURRENT COMPANY CONTENT (this is always up to date — treat it as the single
source of truth, overriding anything you may otherwise "know" about this
company):

{portfolio_json}

Rules:
- Answer only using the content above. Do not invent facts, team members,
  projects, or services that are not present in it.
- If asked something unrelated to this company (general knowledge, coding
  help, other companies, personal opinions, etc.), politely decline and
  redirect the person to ask about the company's services, team, projects,
  or process instead.
- If the content above does not contain the answer to a company-related
  question, say so honestly rather than guessing.
- Keep answers concise and friendly, matching the tone of a helpful company
  representative.
"""


def _to_gemini_history(history: list[ChatMessageIn]) -> list[types.Content]:
    contents = []

    for item in history:
        role = "model" if item.role == "assistant" else "user"
        contents.append(
            types.Content(role=role, parts=[types.Part.from_text(text=item.content)])
        )

    return contents


async def get_assistant_reply(
    message: str,
    history: list[ChatMessageIn],
    portfolio: dict,
) -> str:
    system_prompt = build_system_prompt(portfolio)

    contents = _to_gemini_history(history)
    contents.append(types.Content(role="user", parts=[types.Part.from_text(text=message)]))

    response = await client.aio.models.generate_content(
        model=settings.gemini_model,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.4,
            max_output_tokens=600,
        ),
    )

    return response.text or "I'm not sure how to answer that."