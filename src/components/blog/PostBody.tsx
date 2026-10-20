import type { ReactNode } from "react";
import type { Block, Reference } from "@/content/posts";

const link =
  "text-foreground underline decoration-1 decoration-hairline underline-offset-4 transition-colors hover:decoration-foreground active:decoration-foreground";

/** Three-line serif initial on the opening paragraph. */
const dropCap =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-[0.1em] first-letter:text-[4.1em] first-letter:font-light first-letter:leading-[0.8] first-letter:text-foreground";

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
  const firstP = blocks.findIndex(b => b.type === "p");

  const nodes: ReactNode[] = blocks.map((b, i) => {
    if (b.type === "figure") {
      return (
        <figure key={i} className="!my-10 border-y hairline py-6">
          {figures?.[b.id]}
          {b.caption && (
            <figcaption className="mt-4 font-mono text-xs font-light leading-relaxed tracking-[0.04em] text-muted">
              {b.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    if (b.type === "quote") {
      return (
        <figure key={i} className="!my-16 mx-auto max-w-[34rem] text-center">
          <span aria-hidden="true" className="block h-12 text-[5.5rem] leading-none text-blue">
            &ldquo;
          </span>
          <blockquote className="text-balance text-3xl font-light italic leading-[1.2] tracking-tight text-foreground md:text-4xl md:leading-[1.2]">
            {b.text}
          </blockquote>
          {b.attribution && <figcaption className="label mt-6">{b.attribution}</figcaption>}
        </figure>
      );
    }
    if (b.type === "h2") {
      return (
        <div key={i} className="!mt-20">
          {b.kicker && <p className="label mb-4">{b.kicker}</p>}
          <h2 className="text-3xl font-normal leading-tight tracking-tight text-foreground md:text-4xl">
            {b.text}
          </h2>
        </div>
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
      <p key={i} className={i === firstP ? dropCap : undefined}>
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
