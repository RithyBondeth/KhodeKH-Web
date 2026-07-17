import { redirect } from "next/navigation"
import { activeCourses } from "@/utils/constants/dashboard.constant"

/** Bare /learn means "resume" — send the student to their most recent course. */
export default function LearnPage() {
  redirect(`/learn/${activeCourses[0].id}`)
}
