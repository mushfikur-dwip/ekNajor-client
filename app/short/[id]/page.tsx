import { notFound } from "next/navigation";
import { NewsShort } from "@/components/news-short";
import { getArticle, getFeed } from "@/lib/api";

export const revalidate = 120;

type ShortPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShortPage({ params }: ShortPageProps) {
  const { id } = await params;
  const [item, feed] = await Promise.all([getArticle(id), getFeed()]);

  if (!item) notFound();

  const index = feed.items.findIndex((feedItem) => feedItem.id === id);
  const previousId = index > 0 ? feed.items[index - 1]?.id : undefined;
  const nextId = index >= 0 ? feed.items[index + 1]?.id : feed.items[0]?.id;

  return <NewsShort item={item} previousId={previousId} nextId={nextId} />;
}
