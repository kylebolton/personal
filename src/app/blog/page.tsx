import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Logo } from "@/components/icons";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "blog",
  description: "Writing by Kyle Bolton on credit, fintech and crypto.",
};

export default function BlogIndex() {
  return (
    <div className="grid-lines min-h-screen">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-6">
        <Link href="/" aria-label="home">
          <Logo />
        </Link>
        <Link href="/" className="label hover:underline">
          kyle bolton
        </Link>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <h1 className="font-display text-[clamp(3.5rem,14vw,9rem)] font-bold leading-[0.85] tracking-tighter">
          blog
        </h1>
        <ul className="mt-16 border-t-2 border-foreground">
          {posts.map(p => (
            <li key={p.slug} className="border-b-2 border-foreground">
              <Link href={`/blog/${p.slug}`} className="group block py-6 md:py-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl font-bold tracking-tighter transition-transform duration-300 group-hover:translate-x-3 md:text-5xl">
                    {p.title}
                  </h2>
                  <ArrowUpRight className="size-7 shrink-0 group-hover:text-red" />
                </div>
                <p className="mt-3 max-w-xl">{p.summary}</p>
                <p className="label mt-4">
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
