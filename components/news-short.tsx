"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  ExternalLink,
  FolderHeart,
  Heart,
  MessageCircle,
  Moon,
  Share2,
  Sun,
  X
} from "lucide-react";
import type { PublicNewsItem } from "@/lib/types";

type NewsShortProps = {
  item: PublicNewsItem;
  previousId?: string;
  nextId?: string;
};

export function NewsShort({ item, previousId, nextId }: NewsShortProps) {
  const router = useRouter();

  useEffect(() => {
    if (nextId) router.prefetch(`/short/${nextId}`);
    if (previousId) router.prefetch(`/short/${previousId}`);
  }, [nextId, previousId, router]);

  return (
    <ReaderFrame>
      <Story item={item} showBack />
    </ReaderFrame>
  );
}

export function NewsReel({ items }: { items: PublicNewsItem[] }) {
  return (
    <ReaderFrame>
      <div className="reel" aria-label="News reel">
        {items.map((item, index) => (
          <section className="reel-item" key={item.id}>
            <Story item={item} priority={index === 0} />
          </section>
        ))}
      </div>
    </ReaderFrame>
  );
}

function ReaderFrame({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = window.localStorage.getItem("ek-theme");
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ek-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="ek-root" data-accent="terra" data-theme={dark ? "dark" : "light"}>
      <div className="ek-wrap">
        <div className="phone">
          <ThemeContextButton dark={dark} setDark={setDark} />
          {children}
        </div>
      </div>
    </div>
  );
}

function ThemeContextButton({
  dark,
  setDark
}: {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="theme-float" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

function Story({
  item,
  showBack = false,
  priority = true
}: {
  item: PublicNewsItem;
  showBack?: boolean;
  priority?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [toast, setToast] = useState("");
  // const bodyParagraphs = useMemo(() => splitSummary(item.summary), [item.summary]);
  const publishedTime = formatRelativeTime(item.publishedAt);

  useEffect(() => {
    const savedItems = JSON.parse(window.localStorage.getItem("ek-saved") ?? "[]") as string[];
    setSaved(savedItems.includes(item.id));
  }, [item.id]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }

  function doSave() {
    const savedItems = new Set(JSON.parse(window.localStorage.getItem("ek-saved") ?? "[]") as string[]);
    savedItems.add(item.id);
    window.localStorage.setItem("ek-saved", JSON.stringify([...savedItems]));
    setSaved(true);
    setShowSave(true);
  }

  function undoSave() {
    const savedItems = new Set(JSON.parse(window.localStorage.getItem("ek-saved") ?? "[]") as string[]);
    savedItems.delete(item.id);
    window.localStorage.setItem("ek-saved", JSON.stringify([...savedItems]));
    setSaved(false);
    setShowSave(false);
    flash("সংরক্ষণ বাতিল");
  }

  async function share() {
    try {
      const shareUrl = `${window.location.origin}/short/${item.id}`;
      if (navigator.share) {
        await navigator.share({ title: item.headline, text: item.summary, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${item.headline}\n\n${item.summary}\n${shareUrl}`);
        flash("কপি হয়েছে ✓");
      }
    } catch {
      // Native share cancellation is expected.
    }
  }

  return (
    <div className="story">
      <div className="scr">
        <div className="hero">
          {item.imageUrl ? (
            <Image
              className="hero-img"
              src={item.imageUrl}
              alt=""
              fill
              sizes="430px"
              priority={priority}
              unoptimized
            />
          ) : null}
          <div className="hero-lines" />
          <div className="hero-glow" />
          <div className="hero-fade" />
          <div className="nav">
            {showBack ? (
              <Link className="circ" href="/" aria-label="Back to latest">
                <ArrowLeft size={19} />
              </Link>
            ) : (
              <span />
            )}
            <div className="nav-r">
              <button className="circ" onClick={share} aria-label="Share">
                <Share2 size={17} />
              </button>
              <button
                className="circ"
                onClick={doSave}
                style={saved ? { color: "var(--primary)" } : {}}
                aria-label="Save"
              >
                <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        <div className="hcard">
          <div className="hcat">
            <span className="chip">{item.category.name}</span>
            <span className="htime">
              <Clock size={12} /> {publishedTime}
            </span>
          </div>
          <h2 className="hhead">{item.headline}</h2>
          <div className="hrule" />
          <div className="eng">
            <div className="eng-l">
              <button className={`eng-btn${liked ? " liked" : ""}`} onClick={() => setLiked((value) => !value)}>
                <Heart size={18} fill={liked ? "currentColor" : "none"} /> {liked ? "৫৯০" : "৫৮৯"}
              </button>
              <button className="eng-btn" onClick={() => flash("মন্তব্য শিগগিরই")}>
                <MessageCircle size={18} /> ৫৮৯
              </button>
            </div>
            <div className="eng-r">
              <button className={`mini${saved ? " on" : ""}`} onClick={doSave} aria-label="Save">
                <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              </button>
              <button className="mini" onClick={share} aria-label="Share">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="short">
            <span className="short-lab">
              <i />
              এক নজরে
            </span>
            <p>{item.summary}</p>
          </div>

          {/* <h3 className="sec-h">বিস্তারিত</h3>
          {bodyParagraphs.map((paragraph) => (
            <p className="para" key={paragraph}>
              {paragraph}
            </p>
          ))} */}

          <div className="srcbox">
            <span className="l">
              সোর্স<b>{item.source.name}</b>
            </span>
            <a className="srcbtn" href={item.originalUrl} target="_blank" rel="noreferrer">
              মূল খবর পড়ুন <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {showSave && (
        <div className="ov">
          <div className="ov-bd" onClick={() => setShowSave(false)} />
          <div className="ov-sheet">
            <button className="ov-x" onClick={() => setShowSave(false)} aria-label="Close">
              <X size={17} />
            </button>
            <div className="ov-ic">
              <FolderHeart size={44} strokeWidth={1.6} />
            </div>
            <h3 className="ov-t">
              খবরটি সংরক্ষণ হয়েছে
              <br />
              <b>“পরে পড়ব”</b> তে
            </h3>
            <p className="ov-p">খবরটি তোমার এই ডিভাইসের কালেকশনে যোগ হয়েছে।</p>
            <button
              className="ov-go"
              onClick={() => {
                setShowSave(false);
                flash("কালেকশন শিগগিরই");
              }}
            >
              কালেকশন দেখুন
            </button>
            <button className="ov-2" onClick={undoSave}>
              আনডু করুন
            </button>
          </div>
        </div>
      )}

      {toast ? (
        <div className="toast">
          <Check size={14} />
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function splitSummary(summary: string) {
  const sentences = summary
    .split(/(?<=[।.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (sentences.length <= 1) return [summary];

  const first = sentences.slice(0, Math.ceil(sentences.length / 2)).join(" ");
  const second = sentences.slice(Math.ceil(sentences.length / 2)).join(" ");
  return [first, second].filter(Boolean);
}

function formatRelativeTime(value: string | null) {
  if (!value) return "এইমাত্র";

  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));
  if (minutes < 60) return `${toBanglaDigits(minutes)} মিনিট আগে`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${toBanglaDigits(hours)} ঘণ্টা আগে`;

  const days = Math.round(hours / 24);
  return `${toBanglaDigits(days)} দিন আগে`;
}

function toBanglaDigits(value: number) {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(value).replace(/\d/g, (digit) => digits[Number(digit)]);
}
