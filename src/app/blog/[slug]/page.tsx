import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: ["Kyle Bolton"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-8">
        <Link href="/" className="label hover:text-foreground">kyle bolton</Link>
        <Link href="/blog" className="label hover:text-foreground">
          ← blog
        </Link>
      </header>
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-36">
        <p className="label mb-6">
          <time dateTime={post.date}>{formatDate(post.date)}</time> / {post.readingTime}
        </p>
        <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-extralight leading-[1.05] tracking-[-0.04em]">
          {post.title}
        </h1>

        <div className="mt-14 space-y-7 text-[1.0625rem] leading-[1.85] text-foreground/80 md:text-lg">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {post.timeline && (
          <ol className="my-16 border-l hairline">
            {post.timeline.map((t, i) => (
              <li key={t.label} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[3.5px] top-1.5 size-1.5 ${
                    i === 0 ? "bg-red" : i === 1 ? "bg-blue" : "bg-yellow"
                  }`}
                />
                <p className="label">
                  {t.date ? <time dateTime={t.date}>{t.label}</time> : t.label}
                </p>
                <p className="mt-2 text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        )}

        <div className="space-y-7 text-[1.0625rem] leading-[1.85] text-foreground/80 md:text-lg">
          {post.afterTimeline?.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
