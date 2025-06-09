from fastapi import APIRouter, Depends
from sqlmodel import select
import requests
from app.db.database import get_session
from app.models.article import Article
from sqlmodel import Session
import re
from collections import Counter
import string

router = APIRouter()

WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"
WIKI_SEARCH = "https://en.wikipedia.org/w/rest.php/v1/search/title"

STOP_WORDS = {"the", "and", "of", "to", "a", "in", "is", "that", "with", "as", "for", "was", "on", "by", "an"}

def analyze_text(text: str):
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    words = re.findall(r"\w+", text)
    word_count = len(words)
    filtered = [word for word in words if word not in STOP_WORDS]
    most_common = Counter(filtered).most_common(10)
    return word_count, ", ".join([w for w, _ in most_common])

@router.get("/search")
def search_articles(query: str):
    response = requests.get(WIKI_SEARCH, params={"q": query, "limit": 10})
    return response.json().get("pages", [])

@router.get("/article/{title}")
def get_article(title: str):
    response = requests.get(WIKI_API + title)
    data = response.json()
    word_count, top_words = analyze_text(data.get("extract", ""))
    return {
        "title": data.get("title"),
        "summary": data.get("extract"),
        "url": data.get("content_urls", {}).get("desktop", {}).get("page"),
        "word_count": word_count,
        "top_words": top_words
    }

@router.post("/save")
def save_article(article: Article, session: Session = Depends(get_session)):
    session.add(article)
    session.commit()
    session.refresh(article)
    return article

@router.get("/saved")
def get_saved_articles(session: Session = Depends(get_session)):
    return session.exec(select(Article)).all()

@router.delete("/delete/{article_id}")
def delete_article(article_id: int, session: Session = Depends(get_session)):
    article = session.get(Article, article_id)
    if article:
        session.delete(article)
        session.commit()
    return {"deleted": bool(article)}
