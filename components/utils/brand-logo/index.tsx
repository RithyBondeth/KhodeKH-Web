"use client"

import { useId } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  /** Logo mark + wordmark size (default: "md") */
  size?: "sm" | "md" | "lg"
}

/** The Mokot — the tiered crown of the apsara dancer, rising from an open book. */
export function MokotMark({ className }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2383e2" />
          <stop offset="0.55" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#22c9dd" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        <path d="M48 12 C54 24 58 32 58 43 C58 54 53 61 48 63 C43 61 38 54 38 43 C38 32 42 24 48 12 Z" />
        <path d="M29 32 C33 39 35 45 35 52 C35 59 32 63 29 64.5 C26 63 23 59 23 52 C23 45 25 39 29 32 Z" />
        <path d="M67 32 C71 39 73 45 73 52 C73 59 70 63 67 64.5 C64 63 61 59 61 52 C61 45 63 39 67 32 Z" />
        <path d="M48 71 C38 63 25 61 13 63 L13 72 C25 70 38 72 48 81 Z" />
        <path d="M48 71 C58 63 71 61 83 63 L83 72 C71 70 58 72 48 81 Z" />
      </g>
    </svg>
  )
}

/**
 * Apsara Elearning logo — the Mokot crown mark with animated-gradient wordmark.
 * Links back to the landing page.
 */
export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const mark = size === "lg" ? "size-11" : size === "sm" ? "size-8" : "size-9"
  const word = size === "lg" ? "text-xl" : size === "sm" ? "text-base" : "text-lg"

  return (
    <Link href="/" className={cn("group flex items-center gap-2 shrink-0", className)}>
      <MokotMark
        className={cn("shrink-0 transition-transform duration-300 group-hover:scale-110", mark)}
      />
      <span className={cn("font-bold tracking-tight", word)}>
        <span className="gradient-text-animated">Apsara</span>
        <span className="text-muted-foreground font-light"> Elearning</span>
      </span>
    </Link>
  )
}
