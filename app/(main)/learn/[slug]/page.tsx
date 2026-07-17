import { notFound } from "next/navigation"
import { LearnPlayer } from "@/components/learn/learn-player"
import { COURSE_MODULES } from "@/utils/constants/course-content.constant"

interface LearnCoursePageProps {
  params: Promise<{ slug: string }>
}

export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
  const { slug } = await params
  if (!COURSE_MODULES[slug]) notFound()

  return <LearnPlayer slug={slug} />
}
