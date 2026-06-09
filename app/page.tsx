import { EmptyState } from "@/components/empty-state";
import { NewsReel } from "@/components/news-short";
import { getFeed } from "@/lib/api";

export const revalidate = 30;

export default async function HomePage() {
  const feed = await getFeed().catch(() => ({ items: [], nextCursor: null }));

  if (feed.items.length === 0) return <EmptyState />;

  return <NewsReel items={feed.items} />;
}
