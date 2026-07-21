"use client"

import { useEffect } from "react"
import { getMe } from "@/lib/api/user"
import { useProfileStore } from "@/stores/profiles/profile-store"

/**
 * Module-level (not React state) so remounting AppShell on client-side
 * navigation between dashboard/courses/profile doesn't refetch every time —
 * only once per full page load.
 */
let hasFetched = false

/** Call on logout so the next login (same tab, no full reload) refetches. */
export function resetUserStatsFetchFlag() {
  hasFetched = false
}

/**
 * Pulls the student's real XP/streak from `GET /user/me` once per load and
 * pushes them into the profile store. Call from a component mounted on every
 * authenticated page (AppShell).
 */
export function useHydrateUserStats() {
  const setStats = useProfileStore((s) => s.setStats)

  useEffect(() => {
    if (hasFetched) return
    hasFetched = true

    getMe()
      .then((user) => setStats({ xp: user.xp, streak: user.streak }))
      .catch(() => {
        /* Session likely expired mid-flight — the proxy already redirected
           via middleware on next navigation; stale stats just stay put. */
        hasFetched = false
      })
  }, [setStats])
}
