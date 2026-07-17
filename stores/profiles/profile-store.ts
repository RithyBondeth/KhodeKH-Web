"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { studentData } from "@/utils/constants/dashboard.constant"
import type { TAvatarPreset } from "@/utils/constants/avatar.constant"

/** The fields a student can edit. Level, XP and streak are earned, not set. */
export interface IProfileFields {
  name: string
  nameKh: string
  email: string
  /** Key of the built-in avatar the student picked */
  avatar: TAvatarPreset
  /** Lessons the student aims to finish each week — drives the dashboard goal bar */
  weeklyGoal: number
}

interface IProfileState extends IProfileFields {
  updateProfile: (patch: Partial<IProfileFields>) => void
  resetProfile: () => void
}

/** `studentData` seeds the store — it is the account's server-side state today. */
const DEFAULTS: IProfileFields = {
  name: studentData.name,
  nameKh: studentData.nameKh,
  email: studentData.email,
  avatar: studentData.avatar,
  weeklyGoal: studentData.weeklyGoal,
}

export const PROFILE_DEFAULTS = DEFAULTS

export const useProfileStore = create<IProfileState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      updateProfile: (patch) => set(patch),
      resetProfile: () => set(DEFAULTS),
    }),
    { name: "apsara-elearning-profile" }
  )
)
