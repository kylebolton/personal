import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FixedCreditChart } from "@/components/blog/FixedCreditChart";
import { PostBody } from "@/components/blog/PostBody";
import { formatDate, getPost, posts } from "@/content/posts";

const heroes: Record<string, ReactNode> = {
  "fixed-credit-the-next-step-in-defi": <FixedCreditChart className="h-auto w-full" />,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image = post.image ?? "/og-image.png";
  const alt = post.imageAlt ?? post.title;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      siteName: "Kyle Bolton",
      locale: "en_GB",
      publishedTime: post.date,
      authors: ["Kyle Bolton"],
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [{ url: image, alt }],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Person", name: "Kyle Bolton", url: "https://kylebolton.me" },
    image: `https://kylebolton.me${post.image ?? "/og-image.png"}`,
    mainEntityOfPage: `https://kylebolton.me/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-2xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="flex items-center justify-between pt-8">
        <Link href="/" className="label hover:text-foreground">kyle bolton</Link>
        <Link href="/blog" className="label hover:text-foreground">blog</Link>
      </header>

      <main className="py-24 md:py-36">
        <article>
          <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em]">
            {post.title}
            <span className="text-sun">.</span>
          </h1>
          <p className="label mt-6">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="mx-3" aria-hidden="true">/</span>
            {post.readingTime}
          </p>

          {heroes[post.slug] && <div className="mt-12">{heroes[post.slug]}</div>}

          <div className="mt-12">
            {post.blocks ? (
              <PostBody blocks={post.blocks} references={post.references} />
            ) : (
              <LegacyBody post={post} />
            )}
          </div>
        </article>
      </main>

      <footer className="flex items-center justify-between border-t hairline py-8">
        <Link href="/blog" className="label hover:text-foreground">all posts</Link>
      </footer>
    </div>
  );
}

const prose = "space-y-6 text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed";

function LegacyBody({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  return (
    <div className="space-y-12">
      <div className={prose}>
        {post.body?.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      {post.timeline && (
        <ol className="border-t hairline">
          {post.timeline.map(t => (
            <li key={t.label} className="grid gap-2 border-b hairline py-6 md:grid-cols-[8rem_1fr] md:gap-6">
              <span className="label">{t.label}</span>
              <span className="text-lg text-foreground md:text-xl">{t.text}</span>
            </li>
          ))}
        </ol>
      )}
      {post.afterTimeline && (
        <div className={prose}>
          {post.afterTimeline.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      )}
    </div>
  );
}
