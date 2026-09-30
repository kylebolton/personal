"use client";

import Link from "next/link";
import ConstructionFigure from "@/components/ConstructionFigure";
import { Reveal, Rule } from "@/components/Reveal";
import {
  ArrowUpRight,
  BlogIcon,
  GithubIcon,
  LinkedinIcon,
  Logo,
  MailIcon,
} from "@/components/icons";

const projects = [
  {
    name: "liquyn.com",
    href: "https://liquyn.com",
    text: "a fixed rate credit platform on Hyperliquid",
    marker: "group-hover:bg-red",
  },
  {
    name: "threefoldcamera.com",
    href: "https://threefoldcamera.com",
    text: "my app",
    marker: "group-hover:bg-blue",
  },
];

const links = [
  { label: "github", href: "https://github.com/kylebolton", icon: GithubIcon, marker: "group-hover:bg-red" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/kyle-bolton-51453920/",
    icon: LinkedinIcon,
    marker: "group-hover:bg-blue",
  },
  { label: "blog", href: "/blog", icon: BlogIcon, marker: "group-hover:bg-yellow" },
  { label: "contact", href: "mailto:hello@kylebolton.me", icon: MailIcon, marker: "group-hover:bg-red" },
];

const row = "group flex items-center gap-4 border-b hairline py-6 md:py-7";
const marker = "size-1.5 shrink-0 bg-transparent transition-colors duration-300";
const nudge = "transition-transform duration-500 group-hover:translate-x-1";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <header className="flex items-center justify-between pt-8">
        <Logo />
        <span className="label">london, uk</span>
      </header>

      <main>
        <section className="grid items-end gap-16 py-24 md:grid-cols-12 md:py-40">
          <div className="md:col-span-7">
            <Reveal>
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extralight leading-none tracking-[-0.04em]">
                kyle bolton
              </h1>
            </Reveal>
            <Reveal
              delay={0.15}
              className="mt-10 max-w-md space-y-4 text-lg leading-relaxed text-muted md:text-xl"
            >
              <p>
                Senior engineer working in credit and lending at{" "}
                <Link
                  href="https://www.handelsbanken.co.uk"
                  className="text-foreground underline decoration-hairline underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  Handelsbanken
                </Link>
                .
              </p>
              <p>Over 10 years in finance, fintech and startups. Based in London.</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ConstructionFigure className="aspect-square w-full max-w-[14rem] md:max-w-[22rem] text-foreground md:ml-auto" />
          </div>
        </section>

        <section className="grid gap-8 pb-24 md:grid-cols-12 md:pb-32">
          <Rule className="md:col-span-12" />
          <p className="label md:col-span-3">work</p>
          <ul className="md:col-span-9">
            {projects.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.06}>
                  <Link href={p.href} className={`${row}`}>
                    <span className={`${marker} ${p.marker}`} />
                    <span className={`flex-1 ${nudge}`}>
                      <span className="block text-2xl font-light tracking-tight md:text-3xl">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted md:text-base">{p.text}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-foreground" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 pb-24 md:grid-cols-12 md:pb-32">
          <Rule className="md:col-span-12" />
          <p className="label md:col-span-3">elsewhere</p>
          <ul className="md:col-span-9">
            {links.map((l, i) => (
              <li key={l.label}>
                <Reveal delay={i * 0.06}>
                  <Link href={l.href} className={`${row}`}>
                    <span className={`${marker} ${l.marker}`} />
                    <span className={`flex-1 text-2xl font-light tracking-tight md:text-3xl ${nudge}`}>
                      {l.label}
                    </span>
                    <l.icon className="size-4 text-muted transition-colors group-hover:text-foreground" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="flex items-center justify-between border-t hairline py-8">
        <span className="label">© {new Date().getFullYear()} kyle bolton</span>
        <Logo colour={false} className="size-4 text-muted" />
      </footer>
    </div>
  );
}
