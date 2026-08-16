# from fastapi import APIRouter, Depends

# from ..assistant import get_assistant_reply
# from ..portfolio import fetch_portfolio_content
# from ..schemas import ChatRequest, ChatResponse
# from ..security import CurrentUser, get_current_user

# router = APIRouter(prefix="/assistant", tags=["assistant"])


# @router.post("/chat", response_model=ChatResponse)
# async def chat(
#     payload: ChatRequest,
#     user: CurrentUser = Depends(get_current_user),
# ) -> ChatResponse:
#     portfolio = await fetch_portfolio_content()

#     reply = await get_assistant_reply(
#         message=payload.message,
#         history=payload.history or [],
#         portfolio=portfolio,
#     )

#     return ChatResponse(reply=reply)


from fastapi import APIRouter

from ..assistant import get_assistant_reply
from ..portfolio import fetch_portfolio_content
from ..schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    portfolio = await fetch_portfolio_content()

    reply = await get_assistant_reply(
        message=payload.message,
        history=payload.history or [],
        portfolio=portfolio,
    )

    return ChatResponse(reply=reply)