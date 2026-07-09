import { Sparkles } from "lucide-react"

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 rounded-2xl gradient-bg-primary flex items-center justify-center animate-pulse">
          <Sparkles className="size-6 text-white" />
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full gradient-bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Loading courses…</p>
      </div>
    </div>
  )
}
