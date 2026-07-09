"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  Sparkles,
  EyeIcon,
  EyeClosedIcon,
  LockIcon,
  MailIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypographyH3 } from "@/components/utils/typography/typography-h3"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const t = useTranslations("auth")

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── Form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-8 py-12">
        {/* Logo */}
        <Link href="/" className="mb-10 flex items-center gap-2.5">
          <div className="gradient-bg-primary flex size-9 items-center justify-center rounded-xl">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Kode</span>
            <span className="font-light text-muted-foreground">KH</span>
          </span>
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <TypographyH3 className="text-2xl font-bold">
              {t("loginTitle")}
            </TypographyH3>
          </div>

          <div className="space-y-3">
            <Input
              prefix={<MailIcon />}
              placeholder={t("emailPlaceholder")}
              type="email"
            />
            <Input
              prefix={<LockIcon />}
              placeholder={t("passwordPlaceholder")}
              type={passwordVisible ? "text" : "password"}
              suffix={
                passwordVisible ? (
                  <EyeClosedIcon
                    onClick={() => setPasswordVisible(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setPasswordVisible(true)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Button className="w-full">{t("loginButton")}</Button>
          </div>

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

      {/* ── Decorative panel ── */}
      <div className="gradient-bg-primary relative hidden flex-1 overflow-hidden md:flex">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-12 text-center text-white">
          <div className="text-6xl">🇰🇭</div>
          <div>
            <h2 className="mb-3 text-3xl font-bold">Welcome back!</h2>
            <p className="max-w-xs text-base leading-relaxed text-white/75">
              Continue your coding journey with KodeKH — Cambodia&apos;s
              first AI-powered coding platform.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {["Python", "JavaScript", "React", "Algorithms"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
