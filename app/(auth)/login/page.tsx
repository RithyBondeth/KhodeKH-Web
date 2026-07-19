"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { EyeIcon, EyeClosedIcon, LockIcon, MailIcon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthShowcase } from "@/components/auth/auth-showcase"
import { BrandLogo } from "@/components/utils/brand-logo"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const t = useTranslations("auth")
  const formRef = useRef<HTMLDivElement>(null)

  /* Entrance timeline — logo pops, then the form cascades up */
  useEffect(() => {
    const root = formRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-auth-logo]", {
        opacity: 0,
        scale: 0.7,
        y: -24,
        duration: 0.7,
        ease: "back.out(1.8)",
      }).from(
        "[data-auth-field]",
        { opacity: 0, y: 28, duration: 0.6, stagger: 0.1 },
        "-=0.25"
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── Form panel ── */}
      <div
        ref={formRef}
        className="relative flex flex-1 flex-col items-center justify-center bg-background px-8 py-12"
      >
        {/* Soft ambient background behind the form */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Grid comes from the auth layout's <PaperGrid />, not from here. */}
          <div className="aurora-orb aurora-blue -top-24 -left-24 size-80" />
          <div
            className="aurora-orb aurora-violet -right-16 -bottom-24 size-72"
            style={{ animationDelay: "-14s" }}
          />
        </div>

        <div data-auth-logo className="relative mb-10">
          <BrandLogo size="lg" />
        </div>

        <div className="relative w-full max-w-sm space-y-6">
          <div data-auth-field className="text-center">
            <TypographyH3 className="text-2xl font-bold">
              {t("loginTitle")}
            </TypographyH3>
          </div>

          <div className="space-y-3">
            <div data-auth-field>
              <Input
                prefix={<MailIcon />}
                placeholder={t("emailPlaceholder")}
                type="email"
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
              />
            </div>
            <div data-auth-field>
              <Input
                prefix={<LockIcon />}
                placeholder={t("passwordPlaceholder")}
                type={passwordVisible ? "text" : "password"}
                className="bg-background/70 backdrop-blur-sm transition-shadow duration-300 focus-within:shadow-[0_0_24px_-8px_rgba(35,131,226,0.5)]"
                suffix={
                  passwordVisible ? (
                    <EyeClosedIcon
                      onClick={() => setPasswordVisible(false)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setPasswordVisible(true)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  )
                }
              />
            </div>
            <div data-auth-field>
              <Button className="btn-shine w-full transition-all hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(35,131,226,0.6)]">
                {t("loginButton")}
              </Button>
            </div>
          </div>

          <div data-auth-field>
            <TypographyMuted className="text-center text-sm">
              {t("noAccount")}{" "}
              <Link
                href="/register"
                className="font-semibold text-violet-600 hover:underline dark:text-violet-400"
              >
                {t("signUp")}
              </Link>
            </TypographyMuted>
          </div>
        </div>
      </div>

      {/* ── Decorative panel ── */}
      <AuthShowcase
        side="right"
        icon={<Globe className="relative size-9 text-white" />}
        title="Welcome back!"
        description="Continue your learning journey with Apsara Elearning — Cambodia's AI-powered learning platform for every subject."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Mathematics", "Physics", "Khmer", "English"].map((tag, i) => (
            <span
              key={tag}
              className="animate-bob rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </AuthShowcase>
    </div>
  )
}
