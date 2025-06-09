export interface WikiResult {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  description: string;
  thumbnail?: { url: string; width: number; height: number };
}

export interface ArticleDetail {
  title: string;
  summary: string;
  url: string;
  word_count: number;
  top_words: string;
}

export interface SavedArticle extends ArticleDetail {
  id: number;
  wiki_id: number;
  saved_at: string;
}

const BASE = 'http://127.0.0.1:8000';

export async function searchWikipedia(query: string): Promise<WikiResult[]> {
  const res = await fetch(`${BASE}/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getArticle(title: string): Promise<ArticleDetail> {
  const res = await fetch(`${BASE}/article/${encodeURIComponent(title)}`);
  if (!res.ok) throw new Error('Fetch detail failed');
  return res.json();
}

export async function saveArticle(detail: ArticleDetail & { wiki_id: number }): Promise<SavedArticle> {
  const res = await fetch(`${BASE}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detail)
  });
  if (!res.ok) throw new Error('Save failed');
  return res.json();
}

export async function getSaved(): Promise<SavedArticle[]> {
  const res = await fetch(`${BASE}/saved`);
  if (!res.ok) throw new Error('Fetch saved failed');
  return res.json();
}

export async function deleteSaved(id: number): Promise<{ deleted: boolean }> {
  const res = await fetch(`${BASE}/delete/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}