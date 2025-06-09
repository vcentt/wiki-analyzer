from sqlmodel import SQLModel, Field
from datetime import datetime

class Article(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    summary: str
    url: str
    word_count: int
    top_words: str  # JSON string or comma-separated
    saved_at: datetime = Field(default_factory=datetime.utcnow)