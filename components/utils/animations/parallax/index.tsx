"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /** Parallax speed: positive drifts up as you scroll, negative drifts
   *  down. 0.2 ≈ subtle, 0.6 ≈ pronounced. (default: 0.3) */
  speed?: number
}

/**
 * Scroll-scrubbed parallax layer powered by GSAP ScrollTrigger.
 * The element drifts vertically as its section moves through the viewport.
 *
 * @example
 * <Parallax speed={0.4}><FloatingBadge /></Parallax>
 */
export function Parallax({ children, className, speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tween = gsap.fromTo(
      el,
      { y: speed * 120 },
      {
        y: speed * -120,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
