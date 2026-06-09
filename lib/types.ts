export type PublicNewsItem = {
  id: string;
  headline: string;
  summary: string;
  publishedAt: string | null;
  imageUrl: string | null;
  originalUrl: string;
  source: {
    id?: string;
    name: string;
    url: string;
  };
  category: {
    id?: string;
    name: string;
    slug: string;
    color: string;
  };
};

export type FeedResponse = {
  items: PublicNewsItem[];
  nextCursor: string | null;
};
