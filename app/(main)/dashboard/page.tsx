"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sparkles, Home, BookOpen, Trophy, Users, Brain,
  Settings, Bell, Search, Flame, Star, ChevronRight,
  Code2, Zap, TrendingUp, Lock, CheckCircle2, Play,
  Clock, LogOut, Plus, ArrowRight, Circle,
} from "lucide-react"
import { ThemeToggle } from "@/components/utils/themes/theme-toggle"
import { AnimateIn } from "@/components/utils/animations/animate-in"
import { CountUp } from "@/components/utils/animations/count-up"

const student = {
  name: "Sok Dara",
  nameKh: "សុខ ដារ៉ា",
  level: 8,
  xp: 2450,
  xpToNext: 3000,
  streak: 12,
  rank: 8,
  avatar: "SD",
}

const ACTIVE_COURSES = [
  {
    id: "python",
    title: "Python Fundamentals",
    titleKh: "មូលដ្ឋានគ្រឹះ Python",
    icon: "🐍",
    progress: 65,
    currentLesson: "Lesson 8: Functions & Scope",
    completedLessons: 15,
    totalLessons: 24,
    xpEarned: 1500,
    xpTotal: 2400,
    color: "violet",
  },
  {
    id: "react",
    title: "Web Dev with React",
    titleKh: "បង្កើតគេហទំព័រ React",
    icon: "⚛️",
    progress: 30,
    currentLesson: "Lesson 7: useState Hook",
    completedLessons: 9,
    totalLessons: 32,
    xpEarned: 900,
    xpTotal: 3200,
    color: "cyan",
  },
]

const ACHIEVEMENTS = [
  { icon: "🔥", name: "Streak Master", done: true, rarity: "Rare" },
  { icon: "🐍", name: "Pythonista", done: true, rarity: "Common" },
  { icon: "⚡", name: "Speed Coder", done: true, rarity: "Epic" },
  { icon: "🌟", name: "First Steps", done: true, rarity: "Common" },
  { icon: "🏆", name: "Top 10", done: false, rarity: "Legendary" },
  { icon: "🧠", name: "Algorithm Pro", done: false, rarity: "Legendary" },
]

const LEADERBOARD = [
  { rank: 1, name: "Vitou Ly", nameKh: "វិទូ លី", xp: 8420, avatar: "VL" },
  { rank: 2, name: "Channa Keo", nameKh: "ចន្នា កែវ", xp: 7890, avatar: "CK" },
  { rank: 3, name: "Sreyleak Nhem", nameKh: "ស្រីលាក់ ញ៉ែម", xp: 7340, avatar: "SN" },
  { rank: 4, name: "Rithy Kong", nameKh: "រិទ្ធី កុង", xp: 6980, avatar: "RK" },
  { rank: 8, name: "Sok Dara (You)", nameKh: "សុខ ដារ៉ា", xp: 2450, avatar: "SD", isYou: true },
]

const DAILY_CHALLENGES = [
  { title: "FizzBuzz", lang: "Python", xp: 50, difficulty: "Easy", done: true },
  { title: "Reverse a String", lang: "JavaScript", xp: 75, difficulty: "Easy", done: false },
  { title: "Binary Search", lang: "Python", xp: 150, difficulty: "Medium", done: false },
]

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BookOpen, label: "Courses", href: "#", active: false },
  { icon: Code2, label: "Playground", href: "/learn", active: false },
  { icon: Brain, label: "AI Mentor", href: "/learn", active: false },
  { icon: Trophy, label: "Leaderboard", href: "#", active: false },
  { icon: Users, label: "Community", href: "#", active: false },
]

const RARITY_COLOR: Record<string, string> = {
  Legendary: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Epic: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400",
  Rare: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400",
  Common: "bg-muted text-muted-foreground",
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const xpPct = (student.xp / student.xpToNext) * 100

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 flex flex-col
        border-r border-border bg-sidebar text-sidebar-foreground
        transition-transform duration-300
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
          <div className="size-8 rounded-xl gradient-bg-primary flex items-center justify-center glow-purple">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">
            <span className="gradient-text">Apsara</span>
            <span className="text-muted-foreground font-light">.ai</span>
          </span>
        </div>

        {/* Student card */}
        <div className="mx-3 mt-4 p-3.5 rounded-2xl card-surface border border-violet-200 dark:border-violet-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-xl gradient-bg-primary flex items-center justify-center font-bold text-sm text-white shrink-0">
              {student.avatar}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-foreground truncate">{student.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{student.nameKh}</div>
            </div>
            <div className="ml-auto shrink-0 flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Flame className="size-3.5" />
              <span className="text-xs font-bold">{student.streak}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Level {student.level}</span>
            <span className="text-violet-600 dark:text-violet-400 font-semibold">
              <CountUp to={student.xp} locale delay={0.4} duration={1.8} ease="power3.out" suffix=" XP" />
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full gradient-bg-primary transition-all" style={{ width: `${xpPct}%` }} />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{(student.xpToNext - student.xp).toLocaleString()} XP to Level {student.level + 1}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active
                  ? "bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 font-medium border border-violet-200 dark:border-violet-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
              {item.active && <div className="ml-auto size-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-border pt-3 space-y-0.5">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
            <Settings className="size-4" />
            Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all">
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="h-16 border-b border-border bg-background/90 backdrop-blur-xl flex items-center gap-4 px-6 shrink-0">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="space-y-1.5 w-5">
              <div className="h-0.5 bg-current rounded" />
              <div className="h-0.5 bg-current rounded" />
              <div className="h-0.5 w-3 bg-current rounded" />
            </div>
          </button>

          <div className="flex-1 max-w-sm">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border text-sm text-muted-foreground">
              <Search className="size-4 shrink-0" />
              <span>Search courses, lessons…</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-background border border-border text-muted-foreground">⌘K</kbd>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/20 text-xs">
              <Zap className="size-3.5 text-violet-600 dark:text-violet-400" />
              <span className="text-violet-700 dark:text-violet-300 font-semibold">
                <CountUp to={student.xp} locale delay={0.3} duration={1.6} ease="power3.out" suffix=" XP" />
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/20 text-xs">
              <Flame className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-700 dark:text-amber-300 font-semibold">
                <CountUp to={student.streak} delay={0.4} duration={1.2} ease="power3.out" suffix="d streak" />
              </span>
            </div>
            <ThemeToggle />
            <button className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
              <Bell className="size-4.5" />
              <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-violet-500" />
            </button>
            <div className="size-9 rounded-xl gradient-bg-primary flex items-center justify-center font-bold text-sm text-white cursor-pointer glow-purple">
              {student.avatar}
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Welcome banner */}
            <AnimateIn animation="flip-up" delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden p-6 card-surface border border-violet-200 dark:border-violet-500/20">
              <div className="absolute inset-0 gradient-bg-subtle opacity-50" />
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-violet-300/20 dark:bg-violet-600/15 blur-3xl" />
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Good morning 👋</div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    Welcome back, <span className="gradient-text">{student.name}</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    You're on a <span className="text-amber-600 dark:text-amber-400 font-semibold">🔥 {student.streak}-day streak</span>! Keep going to unlock the Streak Master badge.
                  </p>
                </div>
                <Link href="/learn">
                  <button className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg-primary hover:opacity-90 transition-all text-sm font-semibold text-white glow-purple shadow-lg">
                    <Play className="size-4 fill-white" />
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
            </AnimateIn>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total XP",   countTo: student.xp,     prefix: "",  suffix: "",  locale: true,  sub: "+320 this week",    icon: Zap,          color: "violet",  trend: "+15%"    },
                { label: "Day Streak", countTo: student.streak,  prefix: "",  suffix: "d", locale: false, sub: "Personal best: 20d", icon: Flame,        color: "amber",   trend: "+3d"     },
                { label: "Rank",       countTo: student.rank,    prefix: "#", suffix: "",  locale: false, sub: "Top 1% this week",   icon: TrendingUp,   color: "cyan",    trend: "↑4"      },
                { label: "Completed",  countTo: 24,              prefix: "",  suffix: "",  locale: false, sub: "Lessons done",       icon: CheckCircle2, color: "emerald", trend: "+3 today" },
              ].map((stat, i) => {
                const colors: Record<string, { bg: string; icon: string; trend: string }> = {
                  violet:  { bg: "bg-violet-100 dark:bg-violet-500/15",   icon: "text-violet-600 dark:text-violet-400",   trend: "text-violet-600 dark:text-violet-400"  },
                  amber:   { bg: "bg-amber-100 dark:bg-amber-500/15",     icon: "text-amber-600 dark:text-amber-400",     trend: "text-amber-600 dark:text-amber-400"    },
                  cyan:    { bg: "bg-cyan-100 dark:bg-cyan-500/15",       icon: "text-cyan-600 dark:text-cyan-400",       trend: "text-cyan-600 dark:text-cyan-400"      },
                  emerald: { bg: "bg-emerald-100 dark:bg-emerald-500/15", icon: "text-emerald-600 dark:text-emerald-400", trend: "text-emerald-600 dark:text-emerald-400"},
                }
                const c = colors[stat.color]
                const entryDelay = 0.1 + i * 0.09
                return (
                  <AnimateIn key={stat.label} animation="bounce-in" delay={entryDelay}>
                  <div className="card-surface rounded-2xl p-5 group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <div className={`size-8 rounded-xl flex items-center justify-center ${c.bg}`}>
                        <stat.icon className={`size-4 ${c.icon}`} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      <CountUp
                        to={stat.countTo}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        locale={stat.locale}
                        delay={entryDelay + 0.35}
                        duration={1.6}
                        ease="power3.out"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{stat.sub}</span>
                      <span className={`text-xs font-semibold ${c.trend}`}>{stat.trend}</span>
                    </div>
                  </div>
                  </AnimateIn>
                )
              })}
            </div>

            {/* Courses + Leaderboard */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Active courses */}
              <div className="lg:col-span-2 space-y-4">
                <AnimateIn animation="fade-right" delay={0.1}>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Active Courses</h2>
                  <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    View all <ChevronRight className="size-3" />
                  </button>
                </div>
                </AnimateIn>

                {ACTIVE_COURSES.map((course, i) => {
                  const barColor = course.color === "violet"
                    ? "from-violet-500 to-violet-400"
                    : "from-cyan-500 to-cyan-400"
                  return (
                    <AnimateIn key={course.id} animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={0.2 + i * 0.12}>
                    <div className="card-surface rounded-2xl p-5 group hover:border-violet-200 dark:hover:border-violet-500/25 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl shrink-0 leading-none mt-0.5">{course.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                              <p className="text-xs text-muted-foreground">{course.titleKh}</p>
                            </div>
                            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 shrink-0">
                              {course.xpEarned}/{course.xpTotal} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3 mt-2">
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">{course.progress}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {course.currentLesson}
                            </div>
                            <Link href="/learn">
                              <button className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                Continue <ArrowRight className="size-3" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    </AnimateIn>
                  )
                })}

                <AnimateIn animation="rotate-in" delay={0.4}>
                <div className="card-surface rounded-2xl p-5 flex items-center justify-center gap-3 border-dashed hover:border-violet-300 dark:hover:border-violet-500/30 transition-all cursor-pointer group">
                  <div className="size-9 rounded-xl bg-violet-100 dark:bg-violet-500/15 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/25 border border-violet-200 dark:border-violet-500/25 flex items-center justify-center transition-all">
                    <Plus className="size-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Browse new courses</span>
                </div>
                </AnimateIn>
              </div>

              {/* Leaderboard */}
              <AnimateIn animation="fade-left" delay={0.15}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Leaderboard</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">This week</span>
                </div>
                <div className="card-surface rounded-2xl overflow-hidden">
                  {LEADERBOARD.map((entry, i) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-3 px-4 py-3 transition-all ${
                        entry.isYou
                          ? "bg-violet-50 dark:bg-violet-500/10 border-y border-violet-200 dark:border-violet-500/20"
                          : "hover:bg-muted/40"
                      } ${i < LEADERBOARD.length - 1 && !entry.isYou ? "border-b border-border" : ""}`}
                    >
                      <div className={`text-sm font-bold w-5 text-center ${
                        entry.rank === 1 ? "text-amber-500" :
                        entry.rank === 2 ? "text-gray-400" :
                        entry.rank === 3 ? "text-orange-500" :
                        entry.isYou ? "text-violet-600 dark:text-violet-400" :
                        "text-muted-foreground"
                      }`}>
                        {entry.rank <= 3 ? ["🥇","🥈","🥉"][entry.rank - 1] : `#${entry.rank}`}
                      </div>
                      <div
                        className="size-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: entry.isYou ? "linear-gradient(135deg,#7c3aed,#0891b2)" : `hsl(${250 + entry.rank * 28}, 50%, 52%)` }}
                      >
                        {entry.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold truncate ${entry.isYou ? "text-violet-700 dark:text-violet-300" : "text-foreground"}`}>
                          {entry.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{entry.nameKh}</div>
                      </div>
                      <div className="text-xs font-bold text-muted-foreground shrink-0">
                        <CountUp to={entry.xp} locale delay={0.2 + i * 0.08} duration={1.4} ease="power2.out" />
                        <span className="font-normal opacity-60"> xp</span>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-border">
                    <button className="w-full text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center justify-center gap-1 py-1 transition-colors">
                      Full leaderboard <ChevronRight className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
              </AnimateIn>
            </div>

            {/* Achievements + Daily challenges */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Achievements */}
              <div className="lg:col-span-2">
                <AnimateIn animation="fade-right" delay={0.05}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Achievements</h2>
                  <span className="text-xs text-muted-foreground">4 / 12 unlocked</span>
                </div>
                </AnimateIn>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {ACHIEVEMENTS.map((badge, i) => (
                    <AnimateIn key={badge.name} animation="swing-in" delay={0.05 + i * 0.07}>
                    <div
                      className={`relative card-surface rounded-2xl p-3 flex flex-col items-center text-center transition-all cursor-default ${
                        !badge.done ? "opacity-40" : "hover:scale-105"
                      }`}
                    >
                      {!badge.done && <Lock className="absolute top-2 right-2 size-2.5 text-muted-foreground" />}
                      <div className={`text-2xl mb-1.5 ${!badge.done ? "grayscale" : ""}`}>{badge.icon}</div>
                      <div className="text-[10px] font-semibold text-foreground leading-tight mb-1">{badge.name}</div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${RARITY_COLOR[badge.rarity]}`}>
                        {badge.rarity}
                      </span>
                    </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>

              {/* Daily challenges */}
              <AnimateIn animation="fade-up" delay={0.1}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    Daily Challenges
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">1/3 done</span>
                  </h2>
                </div>
                <div className="card-surface rounded-2xl overflow-hidden">
                  {DAILY_CHALLENGES.map((ch, i) => (
                    <div
                      key={ch.title}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-all ${
                        i < DAILY_CHALLENGES.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${
                        ch.done
                          ? "bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30"
                          : "bg-muted border border-border"
                      }`}>
                        {ch.done
                          ? <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                          : <Circle className="size-4 text-muted-foreground" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold ${ch.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {ch.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">{ch.lang}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            ch.difficulty === "Easy"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                              : ch.difficulty === "Medium"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                              : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                          }`}>
                            {ch.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0">+{ch.xp}</div>
                    </div>
                  ))}
                  <div className="px-4 py-3 border-t border-border">
                    <Link href="/learn">
                      <button className="w-full py-2 text-xs font-semibold text-center rounded-xl gradient-bg-primary text-white hover:opacity-90 transition-all">
                        Start Challenge →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              </AnimateIn>
            </div>

          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
