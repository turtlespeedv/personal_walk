"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface WalkSectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  onCtaClick?: () => void;
  align?: "left" | "right";
  icon?: React.ReactNode;
}

export default function WalkSection({
  id,
  title,
  description,
  image,
  ctaText,
  onCtaClick,
  align = "right",
  icon = <ArrowRight className="w-5 h-5" />,
}: WalkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current || !bgRef.current) return;

    // Entrance animation
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
      autoAlpha: 0,
      x: align === "right" ? 60 : -60,
      duration: 1.5,
      ease: "power3.out",
    });

    // Parallax effect
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [align]);

  return (
    <section ref={sectionRef} id={id} className="scene-section min-h-[120vh] px-8 md:px-24">
      <div className="bg-painterly">
        <img
          ref={bgRef}
          src={image}
          alt={title}
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-lavender-mist) via-transparent to-(--color-lavender-mist)" />
      </div>

      <div className={cn("relative z-10 w-full flex items-center py-48", align === "right" ? "justify-end" : "justify-start")}>
        <div
          ref={cardRef}
          className="painterly-frame max-w-xl group cursor-pointer"
          onClick={onCtaClick}
          onMouseEnter={() => {
            gsap.to(cardRef.current, {
              y: -12,
              scale: 1.01,
              boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
              duration: 0.8,
              ease: "power2.out",
            });
          }}
          onMouseLeave={() => {
            gsap.to(cardRef.current, {
              y: 0,
              scale: 1,
              boxShadow: "0 0px 0px rgba(0,0,0,0)",
              duration: 0.8,
              ease: "power2.out",
            });
          }}
        >
          <h2 className="font-fredoka text-4xl text-(--color-sage-green) mb-6">{title}</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-(--color-charcoal-blue) font-normal mb-10">
            {description}
          </p>
          <div className="flex items-center gap-4 text-(--color-charcoal-blue) font-fredoka font-medium text-lg opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="border-b border-(--color-charcoal-blue)/20">{ctaText}</span>
            {icon}
          </div>
        </div>
      </div>
    </section>
  );
}
