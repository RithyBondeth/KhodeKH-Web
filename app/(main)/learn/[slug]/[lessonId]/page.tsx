import { notFound } from "next/navigation"
import { LearnPlayer } from "@/components/learn/learn-player"
import { ApiLessonReader } from "@/components/learn/api-lesson-reader"
import { COURSE_MODULES, courseLessons } from "@/utils/constants/course-content.constant"
import { getCourseBySlug } from "@/lib/api/catalog"

interface LearnLessonPageProps {
  params: Promise<{ slug: string; lessonId: string }>
}

export default async function LearnLessonPage({ params }: LearnLessonPageProps) {
  const { slug, lessonId } = await params

  const apiCourse = await getCourseBySlug(slug).catch(() => null)
  if (apiCourse) return <ApiLessonReader slug={slug} initialLessonSlug={lessonId} />

  if (!COURSE_MODULES[slug]) notFound()
  const id = Number(lessonId)
  if (!courseLessons(slug).some((l) => l.id === id)) notFound()

  return <LearnPlayer slug={slug} initialLessonId={id} />
}
