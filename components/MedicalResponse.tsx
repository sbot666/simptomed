"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const PHONE_REGEX = /\b(8-800-2000-122|103|112)\b/g;

function linkifyPhones(text: string): string {
  return text.replace(PHONE_REGEX, (match) => {
    const digits = match.replace(/-/g, "");
    return `[${match}](tel:${digits})`;
  });
}

const SECTION_HEADERS = [
  "Возможные причины",
  "К какому врачу обратиться",
  "Когда нужна срочная помощь",
  "Что можно сделать сейчас",
  "Что делать сейчас",
];

function textContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props?: { children?: React.ReactNode } };
    return textContent(element.props?.children);
  }
  return "";
}

const components: Components = {
  p({ children }) {
    const text = textContent(children).trim();

    if (text.startsWith("🚨 СРОЧНО")) {
      return (
        <div className="my-4 rounded-xl border-l-4 border-red-500 bg-red-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white animate-pulse-slow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="font-semibold text-red-900 leading-snug">
                {children}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="tel:103"
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-3 py-1.5 rounded-lg transition"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  103
                </a>
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-3 py-1.5 rounded-lg transition"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  112
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (text.startsWith("⚠️") && text.includes("не медицинская консультация")) {
      return (
        <p className="mt-3 text-xs text-slate-500 italic leading-relaxed">
          {children}
        </p>
      );
    }

    return <p className="my-2 leading-relaxed">{children}</p>;
  },

  strong({ children }) {
    const text = textContent(children).trim();
    if (SECTION_HEADERS.some((h) => text === h || text.startsWith(h))) {
      return (
        <span className="block mt-5 mb-1.5 text-brand-700 font-semibold text-[15px] uppercase tracking-wide">
          {children}
        </span>
      );
    }
    return <strong className="font-semibold text-slate-900">{children}</strong>;
  },

  ul({ children }) {
    return (
      <ul className="my-2 space-y-1 pl-0 list-none" data-list="ul">
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return (
      <ol className="my-2 space-y-1.5 pl-5 list-decimal marker:text-brand-600 marker:font-semibold" data-list="ol">
        {children}
      </ol>
    );
  },

  li({ children, node }) {
    const parentTag =
      node &&
      "parentNode" in node &&
      (node as { parentNode?: { tagName?: string } }).parentNode?.tagName;

    if (parentTag === "ol") {
      return <li className="leading-relaxed pl-1">{children}</li>;
    }
    return (
      <li className="flex items-start gap-2 leading-relaxed">
        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-500" />
        <span className="flex-1">{children}</span>
      </li>
    );
  },

  hr() {
    return <hr className="my-4 border-slate-200" />;
  },

  a({ href, children }) {
    if (href?.startsWith("tel:")) {
      return (
        <a
          href={href}
          className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 underline decoration-red-300 underline-offset-2"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {children}
        </a>
      );
    }
    return (
      <a href={href} className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },

  h1: ({ children }) => <h3 className="font-semibold text-lg mt-4 mb-2">{children}</h3>,
  h2: ({ children }) => <h3 className="font-semibold text-lg mt-4 mb-2">{children}</h3>,
  h3: ({ children }) => <h3 className="font-semibold text-base mt-3 mb-1.5">{children}</h3>,
};

type Props = {
  content: string;
  isStreaming?: boolean;
};

export default function MedicalResponse({ content, isStreaming = false }: Props) {
  const processed = linkifyPhones(content);

  return (
    <div className="text-slate-800 text-[15px]">
      <ReactMarkdown components={components}>{processed}</ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-1.5 h-4 bg-brand-500 animate-pulse ml-0.5 align-middle rounded-sm" />
      )}
    </div>
  );
}
