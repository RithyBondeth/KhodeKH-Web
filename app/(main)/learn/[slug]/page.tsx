import { notFound } from "next/navigation"
import { LearnPlayer } from "@/components/learn/learn-player"
import { ApiLessonReader } from "@/components/learn/api-lesson-reader"
import { COURSE_MODULES } from "@/utils/constants/course-content.constant"
import { getCourseBySlug } from "@/lib/api/catalog"

interface LearnCoursePageProps {
  params: Promise<{ slug: string }>
}

export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
  const { slug } = await params

  const apiCourse = await getCourseBySlug(slug).catch(() => null)
  if (apiCourse) return <ApiLessonReader slug={slug} />

  if (!COURSE_MODULES[slug]) notFound()
  return <LearnPlayer slug={slug} />
}
