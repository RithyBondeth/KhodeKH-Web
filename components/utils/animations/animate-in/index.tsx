"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

/** Use useLayoutEffect on client (prevents visible flash), useEffect on server (no-op) */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/* ── Animation catalogue ─────────────────────────────────────────────── */

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur-up"
  | "zoom"
  | "rotate-in"    // rotation + lift — great for cards
  | "flip-up"      // 3-D X-axis perspective flip
  | "bounce-in"    // elastic pop from below
  | "swing-in"     // elastic rotation swing — great for badges

type AnimConfig = {
  from: gsap.TweenVars
  duration: number
  ease: string
}

const ANIM: Record<AnimationType, AnimConfig> = {
  /* ─ directional slides ─ */
  "fade-up":    { from: { opacity: 0, y: 60 },                                                  duration: 0.85, ease: "power3.out"          },
  "fade-down":  { from: { opacity: 0, y: -48 },                                                 duration: 0.80, ease: "power3.out"          },
  "fade-left":  { from: { opacity: 0, x: 80 },                                                  duration: 0.85, ease: "power3.out"          },
  "fade-right": { from: { opacity: 0, x: -80 },                                                 duration: 0.85, ease: "power3.out"          },
  /* ─ opacity only ─ */
  "fade":       { from: { opacity: 0 },                                                           duration: 0.90, ease: "power2.inOut"        },
  /* ─ scale / depth ─ */
  "scale":      { from: { opacity: 0, scale: 0.72 },                                             duration: 0.80, ease: "back.out(1.9)"       },
  "zoom":       { from: { opacity: 0, scale: 0.80, y: 28 },                                      duration: 0.85, ease: "power3.out"          },
  /* ─ blur ─ */
  "blur-up":    { from: { opacity: 0, y: 32, filter: "blur(14px)" },                            duration: 1.00, ease: "power3.out"          },
  /* ─ premium GSAP-only ─ */
  "rotate-in":  { from: { opacity: 0, rotation: -14, y: 44 },                                   duration: 0.90, ease: "back.out(1.5)"       },
  "flip-up":    { from: { opacity: 0, rotationX: 60, y: 44, transformPerspective: 900 },         duration: 0.95, ease: "power3.out"          },
  "bounce-in":  { from: { opacity: 0, y: 72, scale: 0.84 },                                      duration: 1.10, ease: "elastic.out(1, 0.5)" },
  "swing-in":   { from: { opacity: 0, rotation: 14, scale: 0.86 },                               duration: 1.00, ease: "elastic.out(1, 0.65)"},
}

/* ── Props ───────────────────────────────────────────────────────────── */

interface AnimateInProps {
  /** Content to animate */
  children: React.ReactNode
  /** Extra classes added to the wrapper div */
  className?: string
  /** Animation style (default: "fade-up") */
  animation?: AnimationType
  /** Delay in seconds before the animation plays (default: 0) */
  delay?: number
  /** Fraction of the element visible to trigger (0–1, default: 0.08) */
  threshold?: number
  /** Animate once and stop observing (default: true) */
  once?: boolean
}

/* ── Component ───────────────────────────────────────────────────────── */

/**
 * Wraps children in a div that animates into view when it enters
 * the viewport, powered by GSAP. Supports 12 animation types.
 *
 * @example
 * <AnimateIn animation="bounce-in" delay={0.1}>
 *   <MyCard />
 * </AnimateIn>
 */
export function AnimateIn({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.08,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  /**
   * Set the initial hidden state synchronously before the browser paints.
   * This prevents the element from flashing in its visible state before
   * the IntersectionObserver fires.
   */
  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Honour user's reduced-motion preference — skip hiding entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.set(el, ANIM[animation].from)
  }, [animation])

  /** Wire up IntersectionObserver → GSAP entrance animation. */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const { from, duration, ease } = ANIM[animation]

    // Build the "to" vars — reset every animated property back to its natural value
    const toVars: gsap.TweenVars = { opacity: 1, duration, ease, delay }
    if (from.y             !== undefined) toVars.y             = 0
    if (from.x             !== undefined) toVars.x             = 0
    if (from.scale         !== undefined) toVars.scale         = 1
    if (from.rotation      !== undefined) toVars.rotation      = 0
    if (from.rotationX     !== undefined) toVars.rotationX     = 0
    if (from.filter        !== undefined) {
      toVars.filter = "blur(0px)"
      // Remove the filter inline style after animation to avoid CSS conflicts
      toVars.onComplete = () => gsap.set(el, { filter: "" })
    }
    if (from.transformPerspective !== undefined) {
      toVars.transformPerspective = from.transformPerspective as number
    }

    let tween: gsap.core.Tween | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween?.kill()
          tween = gsap.to(el, toVars)
          if (once) observer.unobserve(el)
        } else if (!once) {
          // Re-hide the element when it leaves the viewport
          tween?.kill()
          gsap.set(el, from)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)

    return () => {
      tween?.kill()
      observer.disconnect()
    }
  }, [animation, delay, threshold, once])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
