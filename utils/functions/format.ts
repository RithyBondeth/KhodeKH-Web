/**
 * Format a number with locale-aware thousands separators.
 * @example formatNumber(12000) → "12,000"
 */
export function formatNumber(n: number, locale = "en-US"): string {
  return n.toLocaleString(locale)
}

const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]

/**
 * Render a number in Khmer numerals. The `km` messages spell numbers out this
 * way, so interpolated values must be converted to match the surrounding text.
 * @example toKhmerNumerals(12) → "១២"
 */
export function toKhmerNumerals(n: number): string {
  return String(n).replace(/\d/g, (d) => KHMER_DIGITS[Number(d)])
}

/**
 * Truncate a string to the given max length, appending "…" if trimmed.
 * @example truncate("Hello World", 5) → "Hello…"
 */
export function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max)}…` : str
}

/**
 * Convert XP points to a human-readable level label.
 * @example xpToLevel(2450) → "Level 8"
 */
export function xpToLevel(xp: number): string {
  const level = Math.floor(xp / 300) + 1
  return `Level ${level}`
}

/**
 * Pad a number with leading zeros to the given width.
 * @example zeroPad(7, 2) → "07"
 */
export function zeroPad(n: number, width = 2): string {
  return String(n).padStart(width, "0")
}
