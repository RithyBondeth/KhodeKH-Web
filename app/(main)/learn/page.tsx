"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Sparkles, Brain, ArrowLeft, ChevronRight, ChevronDown,
  Play, CheckCircle2, Circle, Lock, Send, Zap, Terminal,
  BookOpen, Trophy, Lightbulb, RotateCcw, Maximize2,
  Copy, X, Loader2, ThumbsUp, ThumbsDown, Code2,
} from "lucide-react"
import { ThemeToggle } from "@/components/utils/themes/theme-toggle"
import { AnimateIn } from "@/components/utils/animations/animate-in"

type Lesson = {
  id: number
  title: string
  titleKh: string
  done: boolean
  duration: string
  current?: boolean
  locked?: boolean
}

type Section = { section: string; lessons: Lesson[] }

const COURSE_OUTLINE: Section[] = [
  {
    section: "Module 1: Getting Started",
    lessons: [
      { id: 1, title: "What is Python?", titleKh: "Python គឺជាអ្វី?", done: true, duration: "8 min" },
      { id: 2, title: "Your First Program", titleKh: "កម្មវិធីដំបូង", done: true, duration: "12 min" },
      { id: 3, title: "Variables & Data Types", titleKh: "អថេរ និងប្រភេទទិន្នន័យ", done: true, duration: "15 min" },
    ],
  },
  {
    section: "Module 2: Control Flow",
    lessons: [
      { id: 4, title: "If/Else Statements", titleKh: "លក្ខខណ្ឌ If/Else", done: true, duration: "10 min" },
      { id: 5, title: "For Loops", titleKh: "ចរន្ត For", done: true, duration: "14 min" },
      { id: 6, title: "While Loops", titleKh: "ចរន្ត While", done: false, duration: "12 min", current: true },
      { id: 7, title: "Break & Continue", titleKh: "Break និង Continue", done: false, duration: "8 min" },
    ],
  },
  {
    section: "Module 3: Functions",
    lessons: [
      { id: 8, title: "Defining Functions", titleKh: "បង្កើតអនុគមន៍", done: false, duration: "18 min" },
      { id: 9, title: "Parameters & Return", titleKh: "ប៉ារ៉ាម៉ែត្រ", done: false, duration: "15 min", locked: true },
      { id: 10, title: "Lambda Functions", titleKh: "អនុគមន៍ Lambda", done: false, duration: "12 min", locked: true },
    ],
  },
]

const INITIAL_CODE = `# ចរន្ត While — While Loops
# Lesson 6: Python Fundamentals

count = 1

while count <= 5:
    print(f"ចំនួន: {count}")
    count += 1

print("Done! ✓")
`

const OUTPUT_LINES = ["ចំនួន: 1", "ចំនួន: 2", "ចំនួន: 3", "ចំនួន: 4", "ចំនួន: 5", "Done! ✓"]

type Message = { role: "user" | "ai"; content: string; time: string }

const INITIAL_MESSAGES: Message[] = [
  {
    role: "ai",
    content: "សួស្ដី! ខ្ញុំជា Apsara AI — គ្រូបង្ហាត់ AI របស់អ្នក 🎓\n\nYou're on **Lesson 6: While Loops**. A `while` loop repeats as long as a condition is `True`.\n\nTry running the code to see the output!",
    time: "Just now",
  },
]

const AI_SUGGESTIONS = [
  "What's the difference between for and while?",
  "How do I prevent an infinite loop?",
  "Explain count += 1 in Khmer",
  "Show me a real-world example",
]

const AI_RESPONSES: Record<string, string> = {
  "What's the difference between for and while?":
    "Great question! 🎯\n\n**for loop** — use when you know how many times to repeat:\n```python\nfor i in range(5):  # exactly 5 times\n    print(i)\n```\n\n**while loop** — use when you repeat until a condition changes:\n```python\nwhile user != 'quit':\n    user = input('> ')\n```\n\nRule of thumb: **for** = fixed count, **while** = until a condition.",
  "How do I prevent an infinite loop?":
    "Always **modify the variable** being checked! 🔁\n\n```python\n# ❌ Infinite — count never changes\ncount = 1\nwhile count > 0:\n    print(count)\n\n# ✅ Fixed — count increases each loop\ncount = 1\nwhile count <= 5:\n    print(count)\n    count += 1  # crucial!\n```\n\nYou can also use `break` to exit a loop early.",
  "Explain count += 1 in Khmer":
    "count += 1 មានន័យថា **បន្ថែម 1 ទៅ count**!\n\nនេះគឺដូចគ្នា count = count + 1\n\n```python\ncount = 0\ncount += 1  # now 1\ncount += 1  # now 2\ncount += 5  # now 7\n```\n\nYou can also use `count -= 1` (subtract), `count *= 2` (multiply).",
  "Show me a real-world example":
    "Here's a login system — just like real apps! 🔐\n\n```python\nattempts = 0\npassword = \"secret123\"\n\nwhile attempts < 3:\n    guess = input('Password: ')\n    if guess == password:\n        print('✅ Access granted!')\n        break\n    attempts += 1\n    print(f'❌ Wrong! {3 - attempts} tries left')\nelse:\n    print('🔒 Account locked!')\n```\n\nCan you modify it to allow 5 attempts instead of 3?",
}

export default function LearnPage() {
  const [code, setCode] = useState(INITIAL_CODE)
  const [activeTab, setActiveTab] = useState<"theory" | "practice" | "challenge">("practice")
  const [running, setRunning] = useState(false)
  const [outputLines, setOutputLines] = useState<string[]>([])
  const [showOutput, setShowOutput] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [aiTyping, setAiTyping] = useState(false)
  const [openSections, setOpenSections] = useState([0, 1])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const runCode = () => {
    setRunning(true)
    setShowOutput(true)
    setOutputLines([])
    let i = 0
    const interval = setInterval(() => {
      if (i < OUTPUT_LINES.length) {
        setOutputLines((prev) => [...prev, OUTPUT_LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setRunning(false)
      }
    }, 280)
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const now = new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })
    setMessages((prev) => [...prev, { role: "user", content: text, time: now }])
    setInput("")
    setAiTyping(true)
    setTimeout(() => {
      const response =
        AI_RESPONSES[text] ||
        "That's a great question! 🤔\n\nIn Python, while loops are very powerful. Try changing the values in the code editor and see what happens — hands-on practice is the best way to learn! 💪"
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response, time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }) },
      ])
      setAiTyping(false)
    }, 1400 + Math.random() * 800)
  }

  const toggleSection = (i: number) =>
    setOpenSections((prev) => prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i])

  const renderMessage = (content: string) =>
    content.split("```").map((part, i) => {
      if (i % 2 === 1) {
        const lines = part.split("\n")
        const lang = lines[0]
        const code = lines.slice(1).join("\n")
        return (
          <div key={i} className="my-2 rounded-lg overflow-hidden bg-[#0d0d1a] border border-white/10">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
              <span className="text-[10px] text-white/30 font-mono">{lang || "code"}</span>
              <Copy className="size-3 text-white/30 cursor-pointer hover:text-white/60" />
            </div>
            <pre className="px-3 py-2 text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">{code}</pre>
          </div>
        )
      }
      return (
        <span key={i} className="whitespace-pre-wrap">
          {part.split("**").map((chunk, j) =>
            j % 2 === 1
              ? <strong key={j} className="font-semibold">{chunk}</strong>
              : <span key={j}>{chunk.replace(/`([^`]+)`/g, (_, c) => c).split(/`([^`]+)`/).map((s, k) => k % 2 === 1 ? <code key={k} className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1 rounded text-[10px]">{s}</code> : s)}</span>
          )}
        </span>
      )
    })

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">

      {/* ── COURSE SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 flex flex-col
        border-r border-border bg-sidebar text-sidebar-foreground
        transition-transform duration-300
        xl:relative xl:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-xs">
            <ArrowLeft className="size-3.5" />
            Dashboard
          </Link>
          <div className="h-4 w-px bg-border mx-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground truncate">Python Fundamentals</div>
            <div className="text-[10px] text-muted-foreground">Lesson 6 of 24</div>
          </div>
          <button className="xl:hidden p-1 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="size-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="text-violet-600 dark:text-violet-400 font-semibold">65%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[65%] rounded-full gradient-bg-primary" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>15 done</span>
            <span>24 total</span>
          </div>
        </div>

        {/* Outline */}
        <div className="flex-1 overflow-y-auto py-2">
          {COURSE_OUTLINE.map((section, si) => (
            <div key={si} className="mb-1">
              <button
                onClick={() => toggleSection(si)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-muted/60 transition-colors group"
              >
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {section.section}
                </span>
                <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${openSections.includes(si) ? "rotate-180" : ""}`} />
              </button>

              {openSections.includes(si) && (
                <div className="px-2 pb-1">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        lesson.current
                          ? "bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/20"
                          : lesson.locked ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="shrink-0">
                        {lesson.done
                          ? <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                          : lesson.locked
                          ? <Lock className="size-4 text-muted-foreground" />
                          : lesson.current
                          ? <div className="size-4 rounded-full border-2 border-violet-500 dark:border-violet-400 flex items-center justify-center"><div className="size-1.5 rounded-full bg-violet-500 dark:bg-violet-400" /></div>
                          : <Circle className="size-4 text-muted-foreground/40" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium truncate ${
                          lesson.current ? "text-violet-700 dark:text-violet-300"
                          : lesson.done ? "text-muted-foreground"
                          : "text-foreground/70"
                        }`}>
                          {lesson.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{lesson.titleKh}</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground shrink-0">{lesson.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* XP earned */}
        <div className="px-4 py-3 border-t border-border shrink-0">
          <div className="flex items-center justify-between card-surface rounded-xl p-3 border border-violet-200 dark:border-violet-500/20">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-medium text-foreground">This lesson</span>
            </div>
            <span className="text-sm font-bold gradient-text">+150 XP</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Lesson header */}
        <header className="h-14 border-b border-border bg-background/90 backdrop-blur-xl flex items-center gap-3 px-4 shrink-0">
          <button className="xl:hidden p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all" onClick={() => setSidebarOpen(true)}>
            <BookOpen className="size-4" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="size-5 rounded-md bg-violet-100 dark:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400">6</span>
            </div>
            <h1 className="text-sm font-semibold text-foreground truncate">While Loops</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">/ ចរន្ត While</span>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center bg-muted rounded-xl border border-border p-0.5">
            {(["theory", "practice", "challenge"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "gradient-bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "theory" && <BookOpen className="size-3 inline mr-1.5" />}
                {tab === "practice" && <Code2 className="size-3 inline mr-1.5" />}
                {tab === "challenge" && <Trophy className="size-3 inline mr-1.5" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all">
              <ChevronRight className="size-3.5" />
              Next Lesson
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">

            {/* ─ THEORY ─ */}
            {activeTab === "theory" && (
              <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
                <div className="max-w-2xl mx-auto">
                  <AnimateIn animation="blur-up" delay={0.05}>
                  <h2 className="text-2xl font-bold text-foreground mb-1">While Loops</h2>
                  <p className="text-violet-600 dark:text-violet-400 text-sm mb-8">ចរន្ត While</p>
                  </AnimateIn>

                  <div className="space-y-5">
                    <AnimateIn animation="fade-up" delay={0.1}>
                    <div className="card-surface rounded-2xl p-5">
                      <h3 className="text-base font-semibold text-foreground mb-3">What is a While Loop?</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A <code className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">while</code> loop
                        repeats a block of code as long as a condition remains{" "}
                        <code className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs font-mono">True</code>.
                        Once the condition becomes{" "}
                        <code className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded text-xs font-mono">False</code>, the loop stops.
                      </p>
                    </div>
                    </AnimateIn>

                    <AnimateIn animation="fade-right" delay={0.18}>
                    <div className="card-surface rounded-2xl p-5">
                      <h3 className="text-base font-semibold text-foreground mb-3">Syntax</h3>
                      <div className="bg-[#0d0d1a] border border-white/10 rounded-xl p-4 font-mono text-xs leading-relaxed">
                        <div><span className="text-purple-400">while</span><span className="text-white/70"> condition:</span></div>
                        <div className="pl-4 text-white/50 italic">    # code to repeat</div>
                        <div className="pl-4 text-cyan-400">    # update the condition variable</div>
                      </div>
                    </div>
                    </AnimateIn>

                    <AnimateIn animation="fade-up" delay={0.26}>
                    <div className="card-surface rounded-2xl p-5 border border-amber-200 dark:border-amber-500/25 bg-amber-50/50 dark:bg-amber-500/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="size-4 text-amber-500" />
                        <h3 className="text-base font-semibold text-amber-700 dark:text-amber-300">Important!</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Always make sure the condition eventually becomes{" "}
                        <code className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded text-xs font-mono">False</code>,
                        otherwise you'll create an <strong className="text-amber-600 dark:text-amber-400">infinite loop</strong>!
                      </p>
                    </div>
                    </AnimateIn>

                    <AnimateIn animation="fade-left" delay={0.34}>
                    <div className="card-surface rounded-2xl p-5">
                      <h3 className="text-base font-semibold text-foreground mb-4">Key Terms</h3>
                      <div className="space-y-3">
                        {[
                          { term: "condition", termKh: "លក្ខខណ្ឌ", desc: "Boolean expression that controls the loop" },
                          { term: "iteration", termKh: "ការដំណើរ", desc: "Each time the loop body executes once" },
                          { term: "break", termKh: "បោះបង់", desc: "Exit the loop immediately" },
                          { term: "continue", termKh: "បន្ត", desc: "Skip to the next iteration" },
                        ].map((item) => (
                          <div key={item.term} className="flex items-start gap-3">
                            <code className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded text-xs font-mono shrink-0 mt-0.5">{item.term}</code>
                            <div>
                              <span className="text-muted-foreground text-xs">{item.desc} </span>
                              <span className="text-muted-foreground/50 text-[10px]">/ {item.termKh}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </AnimateIn>
                  </div>
                </div>
              </div>
            )}

            {/* ─ PRACTICE ─ */}
            {activeTab === "practice" && (
              <>
                {/* Editor — always dark bg */}
                <div className="flex-1 flex flex-col min-h-0 bg-[#0d0d1a]">
                  {/* Toolbar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0a0a14] shrink-0">
                    <div className="flex gap-1.5">
                      <div className="size-3 rounded-full bg-red-500/50" />
                      <div className="size-3 rounded-full bg-yellow-500/50" />
                      <div className="size-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <span className="text-xs text-white/40 font-mono ml-1">main.py</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/25">Python 3.11</span>
                    <div className="ml-auto flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all"><RotateCcw className="size-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all"><Copy className="size-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-all"><Maximize2 className="size-3.5" /></button>
                      <button
                        onClick={runCode}
                        disabled={running}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-bg-primary hover:opacity-90 disabled:opacity-40 transition-all text-xs font-semibold text-white"
                      >
                        {running ? <Loader2 className="size-3.5 animate-spin" /> : <Play className="size-3.5 fill-white" />}
                        Run
                      </button>
                    </div>
                  </div>

                  {/* Code area */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* Line numbers */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0a0a14] border-r border-white/5 flex flex-col pt-3 pointer-events-none z-10">
                      {code.split("\n").map((_, i) => (
                        <div key={i} className="text-[11px] text-white/20 text-right pr-2.5 leading-[1.6rem] font-mono select-none">{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="absolute inset-0 pl-12 pr-4 py-3 bg-transparent font-mono text-xs leading-[1.6rem] text-white/85 resize-none outline-none w-full h-full"
                      spellCheck={false}
                    />
                  </div>
                </div>

                {/* Output console */}
                {showOutput && (
                  <div className="h-44 border-t border-white/5 flex flex-col shrink-0 bg-[#08080f]">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 shrink-0">
                      <Terminal className="size-3.5 text-white/40" />
                      <span className="text-xs text-white/40 font-mono">Output</span>
                      {running
                        ? <div className="flex items-center gap-1.5 ml-2"><Loader2 className="size-3 text-emerald-400 animate-spin" /><span className="text-[10px] text-emerald-400">Running…</span></div>
                        : outputLines.length > 0 && <div className="flex items-center gap-1.5 ml-2"><div className="size-1.5 rounded-full bg-emerald-400" /><span className="text-[10px] text-emerald-400">Completed</span></div>
                      }
                      <button className="ml-auto p-1 text-white/30 hover:text-white/60 transition-colors" onClick={() => setShowOutput(false)}>
                        <X className="size-3.5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs space-y-0.5">
                      {outputLines.map((line, i) => <div key={i} className="text-emerald-400 leading-relaxed">{line}</div>)}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ─ CHALLENGE ─ */}
            {activeTab === "challenge" && (
              <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
                <div className="max-w-2xl mx-auto">
                  <AnimateIn animation="bounce-in" delay={0.05}>
                  <div className="card-surface rounded-2xl p-6 mb-6 border border-amber-200 dark:border-amber-500/25 bg-amber-50/40 dark:bg-amber-500/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center">
                        <Trophy className="size-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h2 className="font-bold text-foreground">Challenge: Countdown Timer</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">Medium</span>
                          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">+200 XP</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Write a Python program using a <code className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs font-mono">while</code> loop
                      that counts down from 10 to 1, then prints "Blast off! 🚀".
                    </p>
                    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl p-4 text-xs font-mono">
                      <div className="text-white/30 mb-2"># Expected output:</div>
                      {["10", "9", "8", "...", "1", "Blast off! 🚀"].map((line) => (
                        <div key={line} className="text-emerald-400/70">{line}</div>
                      ))}
                    </div>
                  </div>
                  </AnimateIn>

                  <div className="space-y-3 mb-6">
                    {[
                      "Use a while loop",
                      "Count down (not up)",
                      "Stop at 1, not 0",
                      'Print "Blast off! 🚀" at the end',
                    ].map((req, i) => (
                      <AnimateIn key={req} animation="fade-right" delay={0.15 + i * 0.07}>
                      <div className="flex items-center gap-3 card-surface rounded-xl px-4 py-3">
                        <Circle className="size-4 text-muted-foreground/40 shrink-0" />
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </div>
                      </AnimateIn>
                    ))}
                  </div>

                  <AnimateIn animation="fade-up" delay={0.45}>
                  <button className="w-full py-3 text-sm font-semibold rounded-xl gradient-bg-primary hover:opacity-90 transition-all text-white glow-purple">
                    Start Challenge →
                  </button>
                  </AnimateIn>
                </div>
              </div>
            )}
          </div>

          {/* ── AI PANEL ── */}
          <div className="w-80 border-l border-border flex flex-col bg-card shrink-0 hidden lg:flex">

            {/* AI header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border shrink-0">
              <div className="relative shrink-0">
                <div className="size-8 rounded-xl gradient-bg-primary flex items-center justify-center">
                  <Brain className="size-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 border-2 border-card" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">Apsara AI</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Online · Khmer + English</div>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="size-3 text-violet-500 dark:text-violet-400" />
                <span className="text-[10px] text-violet-600 dark:text-violet-400 font-medium">GPT-4</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "ai" && (
                    <div className="size-6 rounded-lg gradient-bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="size-3 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === "user" ? "ml-auto" : ""}`}>
                    <div className={`rounded-2xl px-3 py-2.5 text-xs leading-relaxed ${
                      msg.role === "ai"
                        ? "bg-muted border border-border text-foreground rounded-tl-none"
                        : "gradient-bg-primary text-white rounded-tr-none"
                    }`}>
                      {renderMessage(msg.content)}
                    </div>
                    <div className={`flex items-center gap-2 mt-1 ${msg.role === "user" ? "justify-end" : ""}`}>
                      <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                      {msg.role === "ai" && (
                        <div className="flex items-center gap-1">
                          <button className="p-0.5 hover:text-emerald-600 dark:hover:text-emerald-400 text-muted-foreground/40 transition-colors"><ThumbsUp className="size-2.5" /></button>
                          <button className="p-0.5 hover:text-red-500 dark:hover:text-red-400 text-muted-foreground/40 transition-colors"><ThumbsDown className="size-2.5" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {aiTyping && (
                <div className="flex gap-2.5">
                  <div className="size-6 rounded-lg gradient-bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="size-3 text-white" />
                  </div>
                  <div className="bg-muted border border-border rounded-2xl rounded-tl-none px-3 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 150, 300].map((delay) => (
                        <div key={delay} className="size-1.5 rounded-full bg-violet-500 dark:bg-violet-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-3 pb-2 shrink-0">
              <div className="text-[10px] text-muted-foreground mb-2">Quick questions</div>
              <div className="flex flex-wrap gap-1.5">
                {AI_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[10px] px-2 py-1 rounded-lg bg-muted/60 border border-border text-muted-foreground hover:text-foreground hover:border-violet-300 dark:hover:border-violet-500/30 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all leading-tight text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border shrink-0">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-muted border border-border rounded-xl px-3 py-2.5 focus-within:border-violet-400 dark:focus-within:border-violet-500/50 transition-all">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage(input)
                      }
                    }}
                    placeholder="Ask Apsara anything…"
                    className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
                  />
                </div>
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || aiTyping}
                  className="shrink-0 size-9 rounded-xl gradient-bg-primary flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all"
                >
                  <Send className="size-3.5 text-white" />
                </button>
              </div>
              <div className="text-[9px] text-muted-foreground text-center mt-1.5">Enter to send · Shift+Enter for new line</div>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm xl:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
