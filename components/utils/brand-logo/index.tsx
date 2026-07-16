"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  /** Logo mark + wordmark size (default: "md") */
  size?: "sm" | "md" | "lg"
}

/**
 * Apsara Elearning logo — gradient mark with animated-gradient wordmark.
 * Links back to the landing page.
 */
export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const mark = size === "lg" ? "size-10 rounded-2xl" : size === "sm" ? "size-7 rounded-lg" : "size-8 rounded-xl"
  const icon = size === "lg" ? "size-5" : "size-4"
  const word = size === "lg" ? "text-xl" : size === "sm" ? "text-base" : "text-lg"

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5 shrink-0", className)}>
      <div
        className={cn(
          "gradient-bg-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110",
          mark
        )}
      >
        <Sparkles className={cn("text-white", icon)} />
      </div>
      <span className={cn("font-bold tracking-tight", word)}>
        <span className="gradient-text-animated">Apsara</span>
        <span className="text-muted-foreground font-light"> Elearning</span>
      </span>
    </Link>
  )
}
