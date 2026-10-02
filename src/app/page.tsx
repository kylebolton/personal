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
  },
  {
    name: "threefold",
    href: "https://threefoldcamera.com",
    text: "an iPhone camera application",
  },
];

const links = [
  { label: "github", href: "https://github.com/kylebolton", icon: GithubIcon },
  { label: "linkedin", href: "https://www.linkedin.com/in/kyle-bolton-51453920/", icon: LinkedinIcon },
  { label: "blog", href: "/blog", icon: BlogIcon, note: "coming soon" },
  { label: "contact", href: "mailto:hello@kylebolton.me", icon: MailIcon },
];

const row = "group relative flex items-center gap-4 py-5 md:py-6";
const marker =
  "absolute left-0 size-1.5 rounded-full bg-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100";
const nudge =
  "transition-transform duration-500 group-hover:translate-x-4 group-active:translate-x-4 group-focus-visible:translate-x-4";
const item = "border-b hairline last:border-b-0";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <header className="flex items-center justify-end pt-8">
        <span className="label">london, uk</span>
      </header>

      <main>
        <section className="pt-24 pb-12 md:pt-36 md:pb-16">
          <div>
            <Reveal>
              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-none tracking-[-0.03em]">
                kyle <span className="underline decoration-1 decoration-hairline underline-offset-[0.2em] md:underline-offset-4">bolton</span>
                <span className="text-sun">.</span>
              </h1>
            </Reveal>
            <Reveal
              delay={0.15}
              className="mt-10 max-w-xl space-y-4 text-xl leading-relaxed text-muted md:text-2xl"
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
          <LondonSkyline className="mt-12 h-auto w-full md:mt-16" />
        </section>

        <section className="pb-14 md:pb-16">
          <Rule />
          <p className="label mt-8 mb-2">work</p>
          <ul>
            {projects.map((p, i) => (
              <li key={p.name} className={item}>
                <Reveal delay={i * 0.06}>
                  <Link href={p.href} className={row}>
                    <span className={marker} />
                    <span className={`flex-1 ${nudge}`}>
                      <span className="block text-2xl font-light tracking-tight md:text-3xl">
                        {p.name}
                      </span>
                      <span className="mt-2 block text-sm text-muted md:text-base">{p.text}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-14 md:pb-16">
          <Rule />
          <p className="label mt-8 mb-2">elsewhere</p>
          <ul>
            {links.map((l, i) => (
              <li key={l.label} className={item}>
                <Reveal delay={i * 0.06}>
                  {l.note ? (
                    <div className={row}>
                      <span className="flex-1 text-2xl font-light tracking-tight text-muted md:text-3xl">
                        {l.label}
                        <span className="label ml-3 align-middle">{l.note}</span>
                      </span>
                      <l.icon className="size-4 text-muted" />
                    </div>
                  ) : (
                    <Link href={l.href} className={row}>
                      <span className={marker} />
                      <span className={`flex-1 text-2xl font-light tracking-tight md:text-3xl ${nudge}`}>
                        {l.label}
                      </span>
                      <l.icon className="size-4 text-muted transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground" />
                    </Link>
                  )}
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
