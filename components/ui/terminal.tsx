"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHAR_INTERVAL_MS = 35;
const TYPING_TRAILING_GAP_MS = 250;
const SPAN_GAP_MS = 350;

function textOf(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sequenceChildren(children: ReactNode) {
  const items = Children.toArray(children);
  const sequenced: ReactNode[] = [];
  let cumulativeDelay = 0;

  for (const child of items) {
    if (!isValidElement(child)) {
      sequenced.push(child);
      continue;
    }
    const el = child as ReactElement<{ children?: ReactNode; delay?: number }>;
    const delay = cumulativeDelay;

    if (el.type === TypingAnimation) {
      const text = textOf(el.props.children);
      cumulativeDelay = delay + text.length * CHAR_INTERVAL_MS + TYPING_TRAILING_GAP_MS;
    } else if (el.type === AnimatedSpan) {
      cumulativeDelay = delay + SPAN_GAP_MS;
    }

    sequenced.push(cloneElement(el, { delay }));
  }

  return sequenced;
}

export function Terminal({ children, className }: { children: ReactNode; className?: string }) {
  const sequenced = sequenceChildren(children);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-paper/15 bg-black shadow-2xl",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-paper/10 bg-ink-soft px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex flex-col gap-2 px-5 py-5 text-sm leading-relaxed">{sequenced}</div>
    </div>
  );
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000, ease: "easeOut" }}
      className={cn("text-paper/80", className)}
    >
      {children}
    </motion.div>
  );
}

export function TypingAnimation({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const fullText = textOf(children);
  const [visibleCount, setVisibleCount] = useState(prefersReducedMotion() ? fullText.length : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setVisibleCount(i);
        if (i >= fullText.length) clearInterval(interval);
      }, CHAR_INTERVAL_MS);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={cn("text-paper", className)}>{fullText.slice(0, visibleCount)}</div>;
}
