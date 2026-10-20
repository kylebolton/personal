import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "blog",
  description: "Writing by Kyle Bolton on credit, fintech and crypto.",
  alternates: { canonical: "/blog" },
};

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <header className="flex items-center justify-between pt-8">
        <Link href="/" className="label hover:text-foreground">kyle bolton</Link>
      </header>
      <main className="py-24 md:py-36">
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-none tracking-[-0.03em]">
          blog<span className="text-sun">.</span>
        </h1>
        <ul className="mt-16 border-t hairline">
          {sorted.map((p, i) => (
            <li key={p.slug} className="border-b hairline">
              <Reveal delay={i * 0.06}>
                <Link href={`/blog/${p.slug}`} className="group relative flex items-start gap-4 py-6 md:py-8">
                  <span className="absolute left-0 top-[2.1rem] size-1.5 rounded-full bg-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100" />
                  <span className="flex-1 transition-transform duration-500 group-hover:translate-x-4 group-active:translate-x-4 group-focus-visible:translate-x-4">
                    <span className="label block">
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                      <span className="mx-3" aria-hidden="true">/</span>
                      {p.readingTime}
                    </span>
                    <span className="mt-3 block text-2xl font-light tracking-tight md:text-3xl">{p.title}</span>
                    <span className="mt-2 block text-sm text-muted md:text-base">{p.summary}</span>
                  </span>
                  <ArrowUpRight className="mt-2 size-4 shrink-0 text-muted transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
