"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const emptySubscribe = () => () => {};

export default function CustomCursor() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "drag">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics for the follower ring
  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isClient) return;

    // Only enable on pointer-fine (mouse/desktop) devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Check hovered element for cursor directives
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") as "hover" | "view" | "drag" | null;
        const customText = cursorTarget.getAttribute("data-cursor-text") || "";
        if (type === "view") {
          setCursorVariant("view");
          setCursorText(customText || "VIEW");
          return;
        }
        if (type === "drag") {
          setCursorVariant("drag");
          setCursorText(customText || "DRAG");
          return;
        }
        if (type === "hover") {
          setCursorVariant("hover");
          setCursorText("");
          return;
        }
      }

      // Check for interactive tags
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      if (interactive) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isClient, mouseX, mouseY]);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-accent-mint"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? (cursorVariant === "view" || cursorVariant === "drag" ? 0 : 1) : 0,
          scale: cursorVariant === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Spring Follower / Interactive Pill */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width:
            cursorVariant === "view" || cursorVariant === "drag"
              ? 76
              : cursorVariant === "hover"
              ? 48
              : 28,
          height:
            cursorVariant === "view" || cursorVariant === "drag"
              ? 76
              : cursorVariant === "hover"
              ? 48
              : 28,
          backgroundColor:
            cursorVariant === "view" || cursorVariant === "drag"
              ? "rgba(0, 255, 178, 0.95)"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0.02)",
          borderColor:
            cursorVariant === "view" || cursorVariant === "drag"
              ? "transparent"
              : cursorVariant === "hover"
              ? "rgba(0, 255, 178, 0.6)"
              : "rgba(255, 255, 255, 0.25)",
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-mono font-bold tracking-wider text-black select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
