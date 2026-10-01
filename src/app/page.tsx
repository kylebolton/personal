"use client";

import Link from "next/link";
import { LondonSkyline } from "@/components/LondonSkyline";
import { Reveal, Rule } from "@/components/Reveal";
import {
  ArrowUpRight,
  BlogIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";

const projects = [
  {
    name: "liquyn",
    href: "https://liquyn.com",
    text: "a fixed rate credit platform on Hyperliquid",
    marker: "bg-sun",
  },
  {
    name: "threefold",
    href: "https://threefoldcamera.com",
    text: "an iPhone camera application",
    marker: "bg-blue",
  },
];

const links = [
  { label: "github", href: "https://github.com/kylebolton", icon: GithubIcon, marker: "bg-sun" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/kyle-bolton-51453920/",
    icon: LinkedinIcon,
    marker: "bg-blue",
  },
  { label: "blog", href: "/blog", icon: BlogIcon, marker: "bg-sun", note: "coming soon" },
  { label: "contact", href: "mailto:hello@kylebolton.me", icon: MailIcon, marker: "bg-sun" },
];

const row = "group relative flex items-center gap-4 border-b hairline py-6 md:py-7";
const marker =
  "absolute -left-3.5 size-1.5 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100";
const nudge =
  "transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-focus-visible:translate-x-1";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <header className="flex items-center justify-between pt-8">
        <span className="label">kyle bolton</span>
        <span className="label">london, uk</span>
      </header>

      <main>
        <section className="pt-24 pb-12 md:pt-36 md:pb-16">
          <div>
            <Reveal>
              <h1 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-light leading-none tracking-[-0.03em]">
                kyle <span className="underline decoration-1 decoration-hairline underline-offset-[0.2em] md:underline-offset-4">bolton</span>
                <span className="text-sun">.</span>
              </h1>
            </Reveal>
            <Reveal
              delay={0.15}
              className="mt-10 max-w-xl space-y-4 text-lg leading-relaxed text-muted md:text-xl"
            >
              <p>
                Senior engineer working in credit and lending at{" "}
                <Link
                  href="https://www.handelsbanken.co.uk"
                  className="text-foreground underline decoration-1 decoration-hairline underline-offset-4 transition-colors hover:decoration-foreground active:decoration-foreground"
                >
                  Handelsbanken
                </Link>
                .
              </p>
              <p>
                Over 10 years in finance, fintech and startups, mostly making money behave. Based in
                London.
              </p>
            </Reveal>
          </div>
          <LondonSkyline className="mt-16 h-auto w-full md:mt-24" />
        </section>

        <section className="pb-24 md:pb-32">
          <Rule />
          <p className="label mt-6 mb-4">work</p>
          <ul>
            {projects.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.06}>
                  <Link href={p.href} className={`${row}`}>
                    <span className={`${marker} ${p.marker}`} />
                    <span className={`flex-1 ${nudge}`}>
                      <span className="block text-xl font-light tracking-tight md:text-2xl">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{p.text}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-24 md:pb-32">
          <Rule />
          <p className="label mt-6 mb-4">elsewhere</p>
          <ul>
            {links.map((l, i) => (
              <li key={l.label}>
                <Reveal delay={i * 0.06}>
                  <Link href={l.href} className={`${row}`}>
                    <span className={`${marker} ${l.marker}`} />
                    <span className={`flex-1 text-xl font-light tracking-tight md:text-2xl ${nudge}`}>
                      {l.label}
                      {l.note && (
                        <span className="label ml-3 align-middle">{l.note}</span>
                      )}
                    </span>
                    <l.icon className="size-4 text-muted transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="flex items-center justify-between border-t hairline py-8">
        <span className="label">© {new Date().getFullYear()} kyle bolton. no cookies, no tracking.</span>
      </footer>
    </div>
  );
}
