"use client"

import { useState } from "react"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingStats } from "@/components/landing/landing-stats"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingCourses } from "@/components/landing/landing-courses"
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingCta } from "@/components/landing/landing-cta"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-float absolute -top-48 left-1/4 h-[700px] w-[700px] rounded-full bg-violet-300/30 blur-[140px] dark:bg-violet-600/12" />
        <div
          className="animate-float absolute top-1/2 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-300/25 blur-[120px] dark:bg-cyan-500/8"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="animate-float absolute bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-200/20 blur-[100px] dark:bg-purple-700/8"
          style={{ animationDelay: "5s" }}
        />
        <div className="grid-pattern absolute inset-0 opacity-70" />
      </div>

      <LandingNavbar
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingCourses />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingCta />
      <LandingFooter />
    </div>
  )
}
