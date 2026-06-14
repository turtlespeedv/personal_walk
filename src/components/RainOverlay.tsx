"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RainOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const dropCount = 90;
    const drops: HTMLDivElement[] = [];

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.className = "drop";
      drop.style.left = `${Math.random() * 100}%`;
      const duration = Math.random() * 0.4 + 0.6;
      const delay = Math.random() * 2;
      container.appendChild(drop);
      drops.push(drop);

      gsap.to(drop, {
        y: window.innerHeight + 200,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      drops.forEach((drop) => drop.remove());
    };
  }, []);

  return <div ref={containerRef} className="rain-container" id="rain-layer" />;
}
