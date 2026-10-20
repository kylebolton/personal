import type { ReactNode } from "react";
import type { Block, Reference } from "@/content/posts";

const link =
  "text-foreground underline decoration-1 decoration-hairline underline-offset-4 transition-colors hover:decoration-foreground active:decoration-foreground";

/** Renders **bold** and [n] / [n][m] citation markers. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|(?:\[\d+\])+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-normal text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("[")) {
          const nums = [...part.matchAll(/\[(\d+)\]/g)].map(m => m[1]);
          return (
            <sup key={i} className="font-mono text-[0.6em] tracking-normal">
              {nums.map((n, j) => (
                <span key={n}>
                  {j > 0 && ","}
                  <a href={`#ref-${n}`} aria-label={`Source ${n}`} className="hover:text-blue">
                    {n}
                  </a>
                </span>
              ))}
            </sup>
          );
        }
        return part;
      })}
    </>
  );
}

export function PostBody({
  blocks,
  references,
  figures,
}: {
  blocks: Block[];
  references?: Reference[];
  figures?: Record<string, ReactNode>;
}) {
  const nodes: ReactNode[] = blocks.map((b, i) => {
    if (b.type === "figure") {
      return (
        <div key={i} className="py-6">
          {figures?.[b.id]}
        </div>
      );
    }
    if (b.type === "h2") {
      return (
        <h2 key={i} className="pt-8 text-2xl font-light tracking-tight text-foreground md:text-3xl">
          {b.text}
        </h2>
      );
    }
    if (b.type === "ul") {
      return (
        <ul key={i} className="space-y-4">
          {b.items.map((item, j) => (
            <li key={j} className="relative pl-6">
              <span aria-hidden="true" className="absolute left-0 top-[0.8em] size-1.5 rounded-full bg-blue" />
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i}>
        <Inline text={b.text} />
      </p>
    );
  });

  return (
    <div className="space-y-6 text-lg leading-relaxed text-foreground md:text-xl md:leading-relaxed">
      {nodes}
      {references && references.length > 0 && (
        <section className="mt-16 border-t hairline pt-8">
          <h2 className="label">references</h2>
          <ol className="mt-6 list-none space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {references.map((r, i) => (
              <li key={i} id={`ref-${i + 1}`} className="relative scroll-mt-8 pl-8 target:text-foreground">
                <span className="absolute left-0 font-mono text-xs">{i + 1}</span>
                <a href={r.href} className={`${link} break-words`}>
                  {r.text}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
