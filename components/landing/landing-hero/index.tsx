"use client"

import Link from "next/link"
import {
  Sparkles, ArrowRight, Play, Brain, Star, ChevronRight, GraduationCap,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { TypographyH1 } from "@/components/utils/typography/typography-h1"
import { TypographyLead } from "@/components/utils/typography/typography-lead"
import { TypographyMuted } from "@/components/utils/typography/typography-muted"

export function LandingHero() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center min-h-screen">

      <AnimateIn animation="fade" delay={0.05} className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-300/40 dark:border-violet-500/30 text-xs font-medium text-violet-700 dark:text-violet-300 shadow-sm">
          <Sparkles className="size-3.5 text-violet-500 dark:text-violet-400" />
          {t("badge")}
          <ChevronRight className="size-3.5 opacity-60" />
        </div>
      </AnimateIn>

      <AnimateIn animation="blur-up" delay={0.15}>
        <TypographyH1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mb-6">
          <span className="gradient-text block mb-1">{t("titleKh")}</span>
          <span className="text-foreground block">{t("titleWith")} </span>
          <span className="relative inline-block">
            <span className="gradient-text">AI Mentor</span>
            <span className="absolute -top-3 -right-8 text-2xl select-none">✨</span>
          </span>
        </TypographyH1>
      </AnimateIn>

      <AnimateIn animation="fade-up" delay={0.3}>
        <TypographyLead className="max-w-xl mb-10 leading-relaxed">
          {t.rich("subtitle", {
            mentor: (chunks) => (
              <span className="text-violet-600 dark:text-violet-400 font-medium">{chunks}</span>
            ),
          })}
        </TypographyLead>
      </AnimateIn>

      <AnimateIn animation="fade-up" delay={0.4}>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link href="/dashboard">
            <button className="group flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-2xl gradient-bg-primary hover:opacity-90 transition-all glow-purple text-white shadow-xl">
              <GraduationCap className="size-5" />
              {t("startLearning")}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/learn">
            <button className="group flex items-center gap-2.5 px-8 py-4 text-base font-medium rounded-2xl glass border border-border hover:border-violet-300 dark:hover:border-violet-500/30 transition-all text-foreground/80 hover:text-foreground">
              <Play className="size-4 fill-current opacity-60" />
              {t("watchDemo")}
            </button>
          </Link>
        </div>
      </AnimateIn>

      <AnimateIn animation="fade" delay={0.5}>
        <div className="flex items-center gap-3 mb-20">
          <div className="flex -space-x-2">
            {["SP","DC","BM","RK","VL"].map((initials, i) => (
              <div key={i} className="size-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: `hsl(${260 + i * 22}, 60%, 55%)` }}>
                {initials}
              </div>
            ))}
          </div>
          <TypographyMuted className="text-sm">
            {t("studentsCount")}
          </TypographyMuted>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />)}
          </div>
        </div>
      </AnimateIn>

      {/* App mockup */}
      <AnimateIn animation="flip-up" delay={0.2} className="w-full max-w-5xl">
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl gradient-bg-primary opacity-10 dark:opacity-20 blur-2xl" />
          <div className="relative card-surface rounded-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400/70" />
                <div className="size-3 rounded-full bg-yellow-400/70" />
                <div className="size-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-xs h-5 rounded-md bg-muted flex items-center px-3 text-[10px] text-muted-foreground">
                  kodekh.com/learn/python
                </div>
              </div>
            </div>
            <div className="flex h-80 md:h-96 bg-card">
              {/* Sidebar */}
              <div className="w-52 border-r border-border bg-muted/20 p-3 hidden sm:block">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Sparkles className="size-4 text-violet-500 dark:text-violet-400" />
                  <span className="text-xs font-semibold text-foreground">KodeKH</span>
                </div>
                {["Dashboard","My Courses","Challenges","Leaderboard"].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl mb-1 text-xs ${
                    i === 1 ? "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-medium" : "text-muted-foreground"
                  }`}>
                    <div className={`size-1.5 rounded-full ${i === 1 ? "bg-violet-500" : "bg-border"}`} />
                    {item}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-border px-2">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-muted-foreground">Level 8</span>
                    <span className="text-violet-600 dark:text-violet-400 font-semibold">2,450 XP</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/5 rounded-full gradient-bg-primary" />
                  </div>
                </div>
              </div>
              {/* Editor */}
              <div className="flex-1 flex flex-col bg-[#0d0d1a]">
                <div className="flex items-center gap-3 px-4 py-2 border-b border-white/5">
                  <span className="text-xs text-white/40 font-mono">main.py</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">Python 3.11</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400">Running</span>
                  </div>
                </div>
                <div className="flex-1 p-4 font-mono text-xs leading-relaxed">
                  <div><span className="text-purple-400">def</span><span className="text-cyan-300"> greet</span><span className="text-white/70">(name):</span></div>
                  <div className="pl-4"><span className="text-white/70">message = </span><span className="text-green-400">&quot;សួស្ដី, &quot;</span><span className="text-white/70"> + name</span></div>
                  <div className="pl-4"><span className="text-purple-400">return</span><span className="text-white/70"> message</span></div>
                  <div className="mt-2"><span className="text-white/30"># Call the function</span></div>
                  <div><span className="text-white/70">result = greet(</span><span className="text-green-400">&quot;ដារ៉ា&quot;</span><span className="text-white/70">)</span></div>
                  <div><span className="text-cyan-400">print</span><span className="text-white/70">(result)</span></div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="text-[10px] text-white/30 mb-1">▸ Output</div>
                    <div className="text-emerald-400">សួស្ដី, ដារ៉ា</div>
                  </div>
                </div>
              </div>
              {/* AI Panel */}
              <div className="w-56 border-l border-border bg-muted/20 p-3 hidden lg:flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-lg gradient-bg-primary flex items-center justify-center shrink-0">
                    <Brain className="size-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground">KodeKH</span>
                  <div className="ml-auto size-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="bg-muted dark:bg-white/5 rounded-xl rounded-tl-none p-2.5 text-[10px] text-muted-foreground leading-relaxed border border-border">
                    Great work! Your <span className="text-cyan-600 dark:text-cyan-400">greet()</span> function is correct. Try adding a default parameter!
                  </div>
                  <div className="bg-violet-100 dark:bg-violet-500/20 rounded-xl rounded-tr-none ml-4 p-2.5 text-[10px] text-violet-700 dark:text-violet-200 leading-relaxed">
                    How do I add a default value?
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <div className="flex-1 h-7 rounded-lg bg-muted border border-border" />
                  <div className="size-7 rounded-lg gradient-bg-primary flex items-center justify-center">
                    <ArrowRight className="size-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
