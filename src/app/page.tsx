"use client";

import Link from "next/link";
import { motion } from "motion/react";
import BauhausShapes from "@/components/BauhausShapes";
import { MaskLine, Reveal, Rule } from "@/components/Reveal";
import {
  ArrowUpRight,
  BlogIcon,
  GithubIcon,
  LinkedinIcon,
  Logo,
  MailIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    name: "liquyn.com",
    href: "https://liquyn.com",
    text: "a fixed rate credit platform on Hyperliquid.",
    tag: "credit",
    accent: "bg-red",
  },
  {
    name: "threefoldcamera.com",
    href: "https://threefoldcamera.com",
    text: "my app.",
    tag: "app",
    accent: "bg-blue",
  },
];

const links = [
  { label: "github", href: "https://github.com/kylebolton", icon: GithubIcon, hover: "group-hover:bg-red" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/kyle-bolton-51453920/",
    icon: LinkedinIcon,
    hover: "group-hover:bg-blue",
  },
  { label: "blog", href: "/blog", icon: BlogIcon, hover: "group-hover:bg-yellow" },
  { label: "contact", href: "mailto:hello@kylebolton.me", icon: MailIcon, hover: "group-hover:bg-red" },
];

const inline =
  "font-semibold underline decoration-2 underline-offset-4 hover:bg-yellow";

export default function Home() {
  return (
    <div className="grid-lines min-h-screen overflow-x-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Logo />
        <span className="label">london, uk</span>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="grid items-center gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <p className="label mb-6">01 / about</p>
            <h1 className="font-display text-[clamp(3.5rem,14vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter">
              <MaskLine>kyle</MaskLine>
              <MaskLine delay={0.1}>bolton</MaskLine>
            </h1>
            <Reveal delay={0.5} className="mt-10 max-w-xl space-y-4 text-lg md:text-xl">
              <p>
                Senior engineer working in credit and lending at{" "}
                <Link href="https://www.handelsbanken.co.uk" className={inline}>
                  Handelsbanken
                </Link>
                .
              </p>
              <p>
                Over 10 years in finance, fintech and startups. Based in London.
              </p>
            </Reveal>
          </div>
          <div className="flex justify-center md:col-span-5 md:justify-end">
            <BauhausShapes />
          </div>
        </section>

        <section className="py-12">
          <Rule />
          <Reveal className="mt-6 mb-10">
            <p className="label">02 / work</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <Link href={p.href} className="group block" aria-label={p.name}>
                  <motion.div whileHover={{ x: 4, y: 4 }} whileTap={{ x: 4, y: 4 }}>
                    <Card className="transition-shadow group-hover:shadow-none">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge>{p.tag}</Badge>
                          <span className={`size-4 ${p.accent} ${i ? "" : "rounded-full"}`} />
                        </div>
                        <CardTitle className="mt-6 flex items-center justify-between text-3xl md:text-4xl">
                          {p.name}
                          <ArrowUpRight className="size-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </CardTitle>
                        <CardDescription className="text-base">{p.text}</CardDescription>
                      </CardHeader>
                      <CardContent />
                    </Card>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-12 pb-24">
          <Rule />
          <Reveal className="mt-6 mb-6">
            <p className="label">03 / links</p>
          </Reveal>
          <ul>
            {links.map((l, i) => (
              <li key={l.label} className="border-b-2 border-foreground">
                <Reveal delay={i * 0.06}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-4 py-5 md:gap-6 md:py-7"
                  >
                    <span
                      className={`size-4 shrink-0 border-2 border-foreground transition-all duration-200 group-hover:size-8 ${l.hover} md:group-hover:size-10`}
                    />
                    <span className="font-display text-4xl font-bold tracking-tighter transition-transform duration-300 group-hover:translate-x-3 md:text-6xl">
                      {l.label}
                    </span>
                    <l.icon className="ml-auto size-7 md:size-9" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between border-t-2 border-foreground py-6">
          <span className="label">© {new Date().getFullYear()} kyle bolton</span>
          <Logo colour={false} />
        </div>
      </footer>
    </div>
  );
}
