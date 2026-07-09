"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const HIGHLIGHT_RULES: [RegExp, string][] = [
  [/^("""[\s\S]*?"""|'''[\s\S]*?'''|f?"[^"]*"|f?'[^']*'|"[^"]*"|'[^']*')/, "text-green-400"],
  [/^(def|return|for|in|class|if|elif|else|while|import|from|as|print|self)\b/, "text-purple-400"],
  [/^#.*/, "text-white/30"],
  [/^\d+(\.\d+)?/, "text-orange-400"],
  [/^([a-zA-Z_]\w*)(?=\()/, "text-cyan-300"],
  [/^__\w+__/, "text-cyan-400"],
  [/^@\w+/, "text-yellow-400"],
]

function splitTokens(text: string) {
  const elements: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    let matched = false

    for (const [pattern, className] of HIGHLIGHT_RULES) {
      const match = remaining.match(pattern)
      if (match) {
        elements.push(
          <span key={key++} className={className}>{match[0]}</span>
        )
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }

    if (!matched) {
      const char = remaining[0]
      let className = "text-white/70"
      if (/^[{}()\].,:;@]$/.test(char)) className = "text-white/60"
      else if (/^[=+\-*/%<>!&|^~]$/.test(char)) className = "text-white/50"
      elements.push(
        <span key={key++} className={className}>{char}</span>
      )
      remaining = remaining.slice(1)
    }
  }

  return elements
}

function Cursor({ visible }: { visible: boolean }) {
  return (
    <span
      className={`text-white/70 transition-opacity duration-100 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      ▍
    </span>
  )
}

interface CodeTyperProps {
  code: string[]
  output?: string[]
  typingSpeed?: number
  outputDelay?: number
  loop?: boolean
  loopDelay?: number
  className?: string
}

export function CodeTyper({
  code,
  output,
  typingSpeed = 80,
  outputDelay = 1200,
  loop = true,
  loopDelay = 5000,
  className = "",
}: CodeTyperProps) {
  const [codeProgress, setCodeProgress] = useState(0)
  const [outputProgress, setOutputProgress] = useState(-1)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((p) => !p), 530)
    return () => clearInterval(interval)
  }, [])

  const restart = useCallback(() => {
    setCodeProgress(0)
    setOutputProgress(-1)
    setDone(false)
  }, [])

  useEffect(() => {
    if (codeProgress < code.length) {
      const timer = setTimeout(() => setCodeProgress((p) => p + 1), typingSpeed)
      return () => clearTimeout(timer)
    }

    if (output && outputProgress === -1) {
      const timer = setTimeout(() => setOutputProgress(0), outputDelay)
      return () => clearTimeout(timer)
    }

    if (output && outputProgress >= 0 && outputProgress < output.length) {
      const timer = setTimeout(() => setOutputProgress((p) => p + 1), typingSpeed * 1.5)
      return () => clearTimeout(timer)
    }

    const allDone = !output
      ? codeProgress >= code.length
      : outputProgress >= output.length

    if (loop && allDone && !done) {
      setDone(true)
      const timer = setTimeout(restart, loopDelay)
      return () => clearTimeout(timer)
    }
  }, [codeProgress, outputProgress, code, output, typingSpeed, outputDelay, loop, loopDelay, done, restart])

  const isTypingCode = codeProgress < code.length
  const isAfterCode = codeProgress >= code.length
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sentinelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [codeProgress, outputProgress])

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      {code.slice(0, codeProgress).map((line, i) => (
        <div key={i} className="min-h-[1.2em] whitespace-pre">
          {splitTokens(line)}
          {i === codeProgress - 1 && isTypingCode && <Cursor visible={cursorVisible} />}
        </div>
      ))}

      {codeProgress === 0 && (
        <div className="min-h-[1.2em]">
          <Cursor visible={cursorVisible} />
        </div>
      )}

      {isAfterCode && output && (
        <>
          <div className={`mt-3 pt-2 border-t border-white/5 transition-opacity duration-500 ${
            outputProgress >= 0 ? "opacity-100" : "opacity-0"
          }`}>
            <div className="text-[10px] text-white/30 mb-1">▸ Output</div>
            {outputProgress >= 0 &&
              output.slice(0, outputProgress).map((line, i) => (
                <div key={i} className="text-emerald-400 whitespace-pre">
                  {line}
                  {i === outputProgress - 1 && outputProgress < output.length && (
                    <Cursor visible={cursorVisible} />
                  )}
                </div>
              ))}
          </div>
        </>
      )}
      <div ref={sentinelRef} />
    </div>
  )
}
