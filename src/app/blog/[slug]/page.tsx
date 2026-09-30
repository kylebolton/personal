import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/icons";
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
    <div className="grid-lines min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-6">
        <Link href="/" aria-label="home">
          <Logo />
        </Link>
        <Link href="/blog" className="label hover:underline">
          ← blog
        </Link>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="label mb-6">
          <time dateTime={post.date}>{formatDate(post.date)}</time> / {post.readingTime}
        </p>
        <h1 className="font-display text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.9] tracking-tighter">
          {post.title}
        </h1>
        <div className="mt-2 h-1 w-24 bg-red" />

        <div className="mt-12 space-y-6 text-lg leading-relaxed md:text-xl">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {post.timeline && (
          <ol className="my-14 border-l-2 border-foreground">
            {post.timeline.map((t, i) => (
              <li key={t.label} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[9px] top-1 size-4 border-2 border-foreground ${
                    i === 0 ? "rounded-full bg-red" : i === 1 ? "bg-blue" : "bg-yellow"
                  }`}
                />
                <p className="label">
                  {t.date ? <time dateTime={t.date}>{t.label}</time> : t.label}
                </p>
                <p className="mt-2 text-lg">{t.text}</p>
              </li>
            ))}
          </ol>
        )}

        <div className="space-y-6 text-lg leading-relaxed md:text-xl">
          {post.afterTimeline?.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
