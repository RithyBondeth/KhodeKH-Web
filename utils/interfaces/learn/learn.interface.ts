import type { TMessageRole } from "@/utils/types/learn"

/* ── Theory block types ──────────────────────────────────────────────── */

export type TTheoryBlock =
  | { type: "intro"; body: string }
  | { type: "code"; title: string; code: string; language?: string }
  | { type: "tip"; title: string; body: string }
  | { type: "warning"; title: string; body: string }
  | { type: "terms"; items: { term: string; termKh: string; desc: string }[] }
  | { type: "comparison"; left: { label: string; code: string }; right: { label: string; code: string } }

/* ── Challenge definition ────────────────────────────────────────────── */

export interface IChallenge {
  title: string
  titleKh: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  requirements: string[]
  expectedOutput: string[]
  xp: number
}

/* ── Lesson ──────────────────────────────────────────────────────────── */

export interface ILesson {
  id: number
  title: string
  titleKh: string
  type: "theory" | "practice" | "challenge"
  duration: string
  xpReward: number
  done?: boolean
  locked?: boolean
  current?: boolean
  // Theory content
  theory?: TTheoryBlock[]
  // Practice
  task?: string
  codeTemplate?: string
  solution?: string
  outputLines?: string[]
  // Challenge
  challenge?: IChallenge
  // AI panel
  aiWelcome?: string
  aiSuggestions?: string[]
  aiResponses?: Record<string, string>
}

/* ── Module ──────────────────────────────────────────────────────────── */

export interface IModule {
  section: string
  sectionKh: string
  lessons: ILesson[]
}

/* ── AI message ──────────────────────────────────────────────────────── */

export interface IMessage {
  role: TMessageRole
  content: string
  time: string
}
