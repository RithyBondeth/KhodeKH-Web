"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * Lightweight hook that applies a GSAP entrance animation to a ref'd element
 * when it enters the viewport.
 *
 * @example
 * const ref = useGsapAnimation<HTMLDivElement>({ from: { opacity: 0, y: 40 }, duration: 0.8 })
 * return <div ref={ref}>...</div>
 */
export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>({
  from,
  to,
  duration = 0.8,
  ease = "power3.out",
  delay = 0,
  threshold = 0.08,
  once = true,
}: {
  from: gsap.TweenVars
  to?: gsap.TweenVars
  duration?: number
  ease?: string
  delay?: number
  threshold?: number
  once?: boolean
}) {
  const ref = useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.set(el, from)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      ease,
      delay,
      ...(to ?? {}),
    }

    if (from.y !== undefined) toVars.y = 0
    if (from.x !== undefined) toVars.x = 0
    if (from.scale !== undefined) toVars.scale = 1
    if (from.rotation !== undefined) toVars.rotation = 0

    let tween: gsap.core.Tween | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween?.kill()
          tween = gsap.to(el, toVars)
          if (once) observer.unobserve(el)
        } else if (!once) {
          tween?.kill()
          gsap.set(el, from)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => { tween?.kill(); observer.disconnect() }
  }, [from, to, duration, ease, delay, threshold, once])

  return ref
}
