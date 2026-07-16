"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

interface TextRevealProps {
  /** Plain text — split on spaces into animated words. Khmer phrases
   *  without spaces animate as a single block, which keeps clusters intact. */
  text: string
  className?: string
  /** Classes applied to every word span (e.g. "gradient-text") */
  wordClassName?: string
  /** Delay in seconds before the first word animates (default: 0) */
  delay?: number
  /** Seconds between each word (default: 0.08) */
  stagger?: number
}

/**
 * Reveals text word-by-word with a rising 3-D flip + blur, triggered
 * when scrolled into view.
 *
 * @example
 * <h1><TextReveal text="Learn to code" delay={0.2} /></h1>
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const words = text.split(" ")

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.set(el.querySelectorAll("[data-word]"), {
      opacity: 0,
      y: 42,
      rotationX: -70,
      filter: "blur(6px)",
      transformPerspective: 600,
    })
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const targets = el.querySelectorAll("[data-word]")
    let tween: gsap.core.Tween | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        tween = gsap.to(targets, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          delay,
          stagger,
          onComplete: () => gsap.set(targets, { clearProps: "filter" }),
        })
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      tween?.kill()
      observer.disconnect()
    }
  }, [text, delay, stagger])

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-visible">
          <span data-word className={cn("inline-block will-change-transform", wordClassName)}>
            {word}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  )
}
