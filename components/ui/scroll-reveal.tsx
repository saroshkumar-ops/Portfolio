"use client";

import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

function Word({ children }: { children: ReactNode }) {
  return <span className="inline-block word">{children}</span>;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitContent = useMemo(() => {
    const nodes = Array.isArray(children) ? children : [children];
    const out: ReactNode[] = [];
    let key = 0;

    nodes.forEach((node) => {
      if (typeof node === "string") {
        node.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            out.push(part);
          } else {
            out.push(<Word key={key++}>{part}</Word>);
          }
        });
      } else if (node !== null && node !== undefined) {
        out.push(<Word key={key++}>{node}</Word>);
      }
    });

    return out;
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller: Window | HTMLElement = scrollContainerRef?.current ?? window;

    const rotateTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: 0.6,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    // The container itself is often just a few lines tall, which gives
    // ScrollTrigger very little natural scroll distance to spread the
    // words across (they'd all reveal within a few px of scroll). Scale
    // the reveal's scroll distance by word count instead, so each word
    // gets a comfortable, consistent window and visibly lights up one at
    // a time rather than all at once.
    const revealDistance = Math.max(wordElements.length * 45, 200);
    const computedEnd =
      wordAnimationEnd === "bottom bottom"
        ? `+=${revealDistance}`
        : wordAnimationEnd;

    // A short duration relative to the stagger delay keeps each word's
    // fade window from overlapping its neighbors, so words visibly light
    // up one at a time as you scroll instead of blending into one fade.
    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        duration: 0.25,
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=10%",
          end: computedEnd,
          scrub: 0.4,
        },
      }
    );

    let blurTween: gsap.core.Tween | undefined;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          duration: 0.25,
          stagger: 0.4,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=10%",
            end: computedEnd,
            scrub: 0.4,
          },
        }
      );
    }

    return () => {
      rotateTween.scrollTrigger?.kill();
      opacityTween.scrollTrigger?.kill();
      blurTween?.scrollTrigger?.kill();
      rotateTween.kill();
      opacityTween.kill();
      blurTween?.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);

  return (
    <h2 ref={containerRef} className={cn("my-5", containerClassName)}>
      <p
        className={cn(
          "text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold",
          textClassName
        )}
      >
        {splitContent}
      </p>
    </h2>
  );
}
