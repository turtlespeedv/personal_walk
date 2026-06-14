"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Volume2, ArrowDown, ArrowRight, Flower, ArrowUp, Leaf } from "lucide-react";
import RainOverlay from "@/components/RainOverlay";
import WalkSection from "@/components/WalkSection";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function GardenWalkPage() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLDivElement>(null);
  const bgHeroRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Ticker synchronization
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Hero Animations
    gsap.from(heroTitleRef.current, {
      autoAlpha: 0,
      x: -50,
      duration: 1.8,
      ease: "power4.out",
    });

    gsap.from(heroSubRef.current, {
      autoAlpha: 0,
      y: 30,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(bgHeroRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Auto-scroll logic (5s after load)
    const autoScrollTimeout = setTimeout(() => {
      if (window.scrollY < 50) {
        lenisInstance.scrollTo("#stop1", {
          duration: 4,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        });
      }
    }, 5000);

    // Prevent auto-scroll if user interacts
    const stopAutoScroll = () => {
      console.log("Auto-scroll stopped by user interaction");
      clearTimeout(autoScrollTimeout);
    };
    
    window.addEventListener("wheel", stopAutoScroll, { once: true });
    window.addEventListener("touchstart", stopAutoScroll, { once: true });
    window.addEventListener("mousedown", stopAutoScroll, { once: true });

    return () => {
      lenisInstance.destroy();
      clearTimeout(autoScrollTimeout);
      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("mousedown", stopAutoScroll);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked until interaction:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const scrollToSection = (id: string, duration: number = 2) => {
    if (lenis) {
      lenis.scrollTo(id, { duration });
    }
  };

  return (
    <main id="smooth-wrapper">
      <div id="smooth-content">
        <RainOverlay />
        <audio ref={audioRef} src="/rain.mp3" loop />

        {/* Audio Pill */}
        <div className="fixed top-8 left-8 z-50">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="audio-pill hover:bg-white/80 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isPlaying ? "Play kroo" : "Sound Muted"}</span>
            <div className="flex gap-0.5 items-end h-3">
              <div className={cn("w-0.5 h-1 bg-(--color-sage-green)", isPlaying && "animate-bounce")} />
              <div className={cn("w-0.5 h-3 bg-(--color-sage-green)", isPlaying && "animate-bounce delay-100")} />
              <div className={cn("w-0.5 h-2 bg-(--color-sage-green)", isPlaying && "animate-bounce delay-200")} />
            </div>
          </button>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="scene-section h-screen px-8 md:px-24">
          <div className="bg-painterly">
            <img
              ref={bgHeroRef}
              src="https://images.unsplash.com/photo-1776286287707-32c03b3691da?auto=format&w=1600&q=80&fit=crop"
              alt="walking time"
              className="w-full h-[120%] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-(--color-lavender-mist)/10 via-transparent to-(--color-lavender-mist)/60" />
            <div className="vignette" />
          </div>

          <div className="relative z-10 max-w-4xl pt-24">
            <h1
              ref={heroTitleRef}
              className="font-fredoka text-7xl md:text-9xl text-(--color-charcoal-blue) leading-[0.9] drop-shadow-sm mb-12"
            >
              come for <br />
              <span className="text-(--color-sage-green)">a walk</span>
            </h1>
            <div ref={heroSubRef} className="max-w-md ml-2 space-y-6">
              <p className="text-xl md:text-2xl text-(--color-charcoal-blue)/80 leading-relaxed font-light italic">
                good morning jaanu.i love you so much. this is a small token of appreciation for you.
              </p>
              <button
                onClick={() => scrollToSection("#stop1")}
                className="flex items-center gap-4 text-(--color-sage-green) font-fredoka font-medium group cursor-pointer"
              >
                <span className="border-b-2 border-transparent group-hover:border-(--color-sage-green) transition-all duration-300">
                  scroll kriyo jaanu
                </span>
                <ArrowRight className="w-6 h-6 animate-pulse" />
              </button>
            </div>
          </div>
        </section>

        {/* Stops */}
        <WalkSection
          id="stop1"
          title="my jiyaaa"
          description="I hope my baby doesn't take too much stress about anything, i love you babe if the world ever feels heavy pls come to me hamesha."
          image="https://images.unsplash.com/photo-1745761500122-a39a7919ec5b?auto=format&w=1600&q=80&fit=crop"
          ctaText="kuchupuchu"
          onCtaClick={() => scrollToSection("#stop2", 2.2)}
          align="right"
        />

        <WalkSection
          id="stop2"
          title="i love you shonaa"
          description="i hope you know how much you mean to me, i love you so much. I can't wait to be with you hameshaa hamesha."
          image="https://images.unsplash.com/photo-1774885798145-f17c3085ec19?auto=format&w=1600&q=80&fit=crop"
          ctaText="love youuu"
          onCtaClick={() => scrollToSection("#end", 2.2)}
          align="left"
          icon={<Leaf className="w-5 h-5 text-(--color-sage-green)" />}
        />

        {/* End Section */}
        <section
          id="end"
          className="scene-section min-h-[80vh] flex flex-col items-center justify-center text-center px-8"
        >
          <div className="bg-painterly">
            <img
              src="https://images.pexels.com/photos/8749133/pexels-photo-8749133.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
              alt="Watercolor Wash"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-(--color-lavender-mist)/40 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 space-y-8">
            <Flower className="w-16 h-16 text-(--color-sage-green) animate-pulse mx-auto" />
            <h2 className="font-fredoka text-5xl md:text-6xl text-(--color-charcoal-blue)">
              
            </h2>
            <p className="text-xl text-(--color-charcoal-blue)/70 font-light max-w-lg mx-auto">
              can't wait till dance hand in hand irl mei.
            </p>
            <button
              onClick={() => scrollToSection("#hero", 3)}
              className="mt-8 font-fredoka text-(--color-sage-green) hover:text-(--color-charcoal-blue) transition-colors uppercase tracking-widest text-sm flex items-center gap-2 mx-auto"
            >
              <ArrowUp className="w-4 h-4" /> Back to the start
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative w-full py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-(--color-sage-green)/10 z-20 bg-(--color-lavender-mist)">
          <div className="flex items-center gap-3">
            <span className="font-fredoka text-xl text-(--color-charcoal-blue)">
              walk.
            </span>
          </div>
          <div className="text-(--color-charcoal-blue)/40 text-sm">&copy; crafted with love.</div>
        </footer>
      </div>
    </main>
  );
}
