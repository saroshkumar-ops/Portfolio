"use client";

import React from "react";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  color?: string;
  speed?: string;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function StarBorder({
  children,
  className = "",
  borderRadius = "9999px",
  color = "#00ffb2",
  speed = "5s",
  as: Component = "div",
  onClick,
  ...props
}: StarBorderProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      onClick={onClick}
      className={`star-border-container ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      <div
        className="border-gradient-full"
        style={{
          animationDuration: speed,
          background: `conic-gradient(from 0deg, transparent 0 310deg, ${color} 345deg, #00d2ff 360deg)`,
        }}
      />
      <div
        className="inner-content"
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
