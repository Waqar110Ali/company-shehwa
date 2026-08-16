import jwt
from fastapi import Header, HTTPException, status
from pydantic import BaseModel

from .config import settings


class CurrentUser(BaseModel):
    sub: str
    email: str
    role: str


def get_current_user(authorization: str = Header(default=None)) -> CurrentUser:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header.",
        )

    token = authorization.removeprefix("Bearer ").strip()

    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token.")

    sub = payload.get("sub")
    email = payload.get("email")
    role = payload.get("role")

    if not sub or not email or not role:
        raise HTTPException(status_code=401, detail="Token missing required claims.")

    return CurrentUser(sub=sub, email=email, role=role)