import type { FeedResponse, PublicNewsItem } from "@/lib/types";

const API_BASE_URL = process.env.EKNOJOR_API_BASE_URL ?? "http://localhost:3000";

export async function getFeed(category?: string): Promise<FeedResponse> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  const url = `${API_BASE_URL}/api/feed${params.toString() ? `?${params}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`Feed request failed: ${response.status}`);
  }

  return response.json() as Promise<FeedResponse>;
}

export async function getArticle(id: string): Promise<PublicNewsItem | null> {
  const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
    next: { revalidate: 120 }
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Article request failed: ${response.status}`);
  }

  const data = (await response.json()) as { item: PublicNewsItem };
  return data.item;
}
