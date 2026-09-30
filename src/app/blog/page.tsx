import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "blog",
  description: "Writing by Kyle Bolton on credit, fintech and crypto.",
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex items-center justify-between pt-8">
        <Link href="/" className="label hover:text-foreground">kyle bolton</Link>
      </header>
      <main className="py-24 md:py-36">
        <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extralight leading-none tracking-[-0.04em]">
          blog
        </h1>
        <ul className="mt-20 border-t hairline">
          {posts.map(p => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block border-b hairline py-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {p.title}
                  </h2>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-foreground" />
                </div>
                <p className="mt-3 max-w-lg text-muted">{p.summary}</p>
                <p className="label mt-5">
                  <time dateTime={p.date}>{formatDate(p.date)}</time> / {p.readingTime}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
