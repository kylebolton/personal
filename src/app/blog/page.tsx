import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "blog",
  description: "Writing by Kyle Bolton on credit, fintech and crypto. Coming soon.",
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex items-center justify-between pt-8">
        <Link href="/" className="label hover:text-foreground">kyle bolton</Link>
      </header>
      <main className="py-24 md:py-36">
        <h1 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-light leading-none tracking-[-0.03em]">
          blog<span className="text-sun">.</span>
        </h1>
        <div className="mt-16 flex items-center gap-6 border-t hairline pt-10">
          <svg viewBox="0 0 80 80" aria-hidden="true" className="size-16 shrink-0 motion-safe:animate-[spin_40s_linear_infinite]">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#2d5bff" strokeWidth="2" />
            <circle cx="40" cy="40" r="27" fill="none" stroke="#2d5bff" strokeWidth="0.75" />
            <path d="M4 40H76M40 4V76M14.5 14.5L65.5 65.5M65.5 14.5L14.5 65.5" stroke="#2d5bff" strokeWidth="0.75" />
            <circle cx="76" cy="40" r="3.5" fill="#f2c94c" />
            <circle cx="4" cy="40" r="3.5" fill="#f8e7a6" />
            <circle cx="40" cy="4" r="3.5" fill="#f8e7a6" />
            <circle cx="40" cy="76" r="3.5" fill="#f8e7a6" />
          </svg>
          <div>
            <p className="text-xl font-light tracking-tight md:text-2xl">Coming soon.</p>
            <p className="mt-2 text-muted">Writing on credit, fintech and crypto.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
