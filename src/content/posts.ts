import { fixedCreditBlocks, fixedCreditReferences } from "./fixed-credit";

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** A chart or illustration, looked up by id in the post page. */
  | { type: "figure"; id: string };

export type Reference = { text: string; href: string };

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingTime: string;
  summary: string;
  blocks: Block[];
  references?: Reference[];
  /** Social share image path under /public (1200x630). Falls back to the site image. */
  image?: string;
  imageAlt?: string;
};

export const posts: Post[] = [
  {
    slug: "fixed-credit-the-next-step-in-defi",
    title: "fixed credit: the next step in defi",
    date: "2026-10-20",
    readingTime: "8 min read",
    summary:
      "Rates that swing by the day are how on-chain lending normally works. That is the reason ordinary borrowers stay away.",
    image: "/blog/fixed-credit-og.png",
    imageAlt:
      "A floating borrow rate that spikes above 10% and almost 40% beside a flat fixed rate of 5.5% held to maturity.",
    blocks: fixedCreditBlocks,
    references: fixedCreditReferences,
  },
];

export function getPost(slug: string) {
  return posts.find(p => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
