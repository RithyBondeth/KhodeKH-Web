"use client"

import { useState } from "react"
import { LandingNavbar }      from "@/components/landing/landing-navbar"
import { LandingHero }        from "@/components/landing/landing-hero"
import { LandingStats }       from "@/components/landing/landing-stats"
import { LandingFeatures }    from "@/components/landing/landing-features"
import { LandingCourses }     from "@/components/landing/landing-courses"
import { LandingHowItWorks }  from "@/components/landing/landing-how-it-works"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingCta }         from "@/components/landing/landing-cta"
import { LandingFooter }      from "@/components/landing/landing-footer"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-48 left-1/4 w-[700px] h-[700px] rounded-full bg-violet-300/30 dark:bg-violet-600/12 blur-[140px] animate-float" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-cyan-300/25 dark:bg-cyan-500/8 blur-[120px] animate-float" style={{ animationDelay: "2.5s" }} />
        <div className="absolute bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-200/20 dark:bg-purple-700/8 blur-[100px] animate-float" style={{ animationDelay: "5s" }} />
        <div className="absolute inset-0 grid-pattern opacity-70" />
      </div>

      <LandingNavbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} />
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
