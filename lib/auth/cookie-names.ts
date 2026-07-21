/**
 * Cookie names live here rather than in `session.ts` because that module is
 * `server-only` — middleware and the isomorphic API client need the names
 * without pulling in the server-only cookie helpers.
 *
 * Follows the existing `apsara-elearning-*` cookie/storage convention.
 */
export const ACCESS_COOKIE = "apsara-elearning-access"
export const REFRESH_COOKIE = "apsara-elearning-refresh"
