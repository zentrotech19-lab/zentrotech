import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/**
 * Shared MDX component map for the dark-glass + indigo brand.
 *
 * Used by `app/(marketing)/insights/[slug]/page.tsx` and
 * `app/(marketing)/work/[slug]/page.tsx` to render MDX bodies
 * with consistent typography. Replaces the previous hand-rolled
 * paragraph splitter, which silently dropped bold, inline code,
 * fenced code blocks, links, and other Markdown semantics.
 */

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

function isInternalHref(href: string | undefined): href is string {
  if (!href) return false;
  if (href.startsWith("/")) return true;
  if (href.startsWith("#")) return true;
  return false;
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-12 mb-6 text-4xl md:text-5xl font-black tracking-tight text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-4 text-3xl md:text-4xl font-black tracking-tight text-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-3 text-2xl font-bold tracking-tight text-white"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-8 mb-2 text-xl font-semibold text-white"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-6 text-lg leading-relaxed text-text-secondary"
      {...props}
    />
  ),
  a: ({ href, children, ...rest }) => {
    const className =
      "text-indigo-glow underline decoration-indigo/40 underline-offset-4 transition-colors hover:text-aurora hover:decoration-aurora";
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={className} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  },
  strong: (props) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: (props) => <em className="italic text-text-secondary" {...props} />,
  code: (props) => (
    <code
      className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-aurora"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-sm leading-relaxed text-text-secondary backdrop-blur"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 text-lg text-text-secondary marker:text-indigo"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 text-lg text-text-secondary marker:text-indigo"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 rounded-r-xl border-l-4 border-indigo bg-white/5 px-6 py-4 italic text-text-muted backdrop-blur"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  img: ({ src, alt, width, height, ...rest }) => {
    const resolvedSrc = typeof src === "string" ? src : "";
    if (!resolvedSrc) return null;
    if (width && height) {
      return (
        <Image
          src={resolvedSrc}
          alt={alt ?? ""}
          width={Number(width)}
          height={Number(height)}
          className="my-8 w-full rounded-2xl border border-white/10"
        />
      );
    }
    // Unsized remote images — fall back to native <img> with brand styling.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc}
        alt={alt ?? ""}
        className="my-8 w-full rounded-2xl border border-white/10"
        {...rest}
      />
    );
  },
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm text-text-secondary" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-white/10 bg-white/5 px-4 py-3 font-semibold text-white"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-white/5 px-4 py-3" {...props} />
  ),
};
