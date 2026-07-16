"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

/**
 * Card whose radial highlight follows the cursor (via the
 * `.spotlight-card` CSS utility and --spot-x/--spot-y variables).
 *
 * @example
 * <SpotlightCard className="card-surface rounded-2xl p-6">…</SpotlightCard>
 */
export function SpotlightCard({ children, className, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn("spotlight-card", className)}
      {...props}
    >
      {children}
    </div>
  )
}
