export type TimelineEntry = {
  /** ISO year or date for <time dateTime>; omit for undated entries. */
  date?: string;
  label: string;
  text: string;
};

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingTime: string;
  summary: string;
  body: string[];
  timeline?: TimelineEntry[];
  afterTimeline?: string[];
};

export const posts: Post[] = [
  {
    slug: "why-crypto-matters",
    title: "why crypto matters",
    date: "2026-09-30",
    readingTime: "3 min read",
    summary:
      "From a working class start in glasgow to five years in crypto: why open, programmable money matters.",
    body: [
      "I grew up working class in Glasgow. Money there was not an abstraction. It was something you watched closely, because there was never much slack in it. Banking was something that happened to you on terms you did not write, and credit, when you could get it at all, was expensive in proportion to how little you had.",
      "I did not have the words for it then, but I understood the shape of it: the people who most needed fair access to money were the ones the system priced worst.",
      "Now I work as a senior engineer in credit and lending at Handelsbanken, with over ten years across finance, fintech and startups. I have seen the traditional system from the inside, and a lot of it is good. Regulated, careful, accountable. But it is also closed, slow, and built around gatekeepers.",
    ],
    timeline: [
      {
        label: "early years",
        text: "Glasgow. Working class. Learning how money really behaves when there is little of it.",
      },
      {
        date: "2021",
        label: "2021",
        text: "I start working in crypto, the beginning of five years in the space.",
      },
      {
        date: "2026",
        label: "today",
        text: "Senior engineer in credit and lending at Handelsbanken, and building liquyn.com, a fixed rate credit platform on Hyperliquid.",
      },
    ],
    afterTimeline: [
      "That contrast is why I care. In crypto I found rails that anyone can use, rules that are written down in code rather than in fine print, and balances you can verify yourself. You do not need to be known to the right people. You do not need permission to participate.",
      "It is not perfect. The space has had its share of hype, fraud and noise, and I do not pretend otherwise. Plenty of it deserves the scepticism it gets. But the underlying idea holds up: money that is open, transparent and programmable is better for the people the old system served worst.",
      "Credit is where this gets interesting. A fixed rate, visible terms and open settlement are simple ideas, and they are exactly what I wished people around me had growing up. That is what I am building with liquyn.com.",
      "Crypto matters because where you start should matter less. That is worth building for.",
    ],
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
