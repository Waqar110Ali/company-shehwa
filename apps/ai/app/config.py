from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    portfolio_api_url: str = "http://localhost:5000/api/v1/portfolio"
    frontend_origin: str = "http://localhost:5173"
    gemini_model: str = "gemini-2.0-flash"

    class Config:
        env_file = ".env"


settings = Settings()