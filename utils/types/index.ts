/** Shared utility types */

/** Any value that can be rendered by React */
export type TRenderable = string | number | boolean | null | undefined

/** Extract the value type from a readonly array */
export type TArrayElement<T extends readonly unknown[]> =
  T extends readonly (infer E)[] ? E : never

/** Make specific keys of T required */
export type TRequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

/** Make specific keys of T optional */
export type TPartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Strict record — all keys in K must be present */
export type TStrictRecord<K extends string, V> = Record<K, V>

/** Course difficulty level */
export type TCourseLevel = "Beginner" | "Intermediate" | "Advanced"

/** Supported programming languages in the platform */
export type TProgrammingLanguage = "python" | "javascript" | "html" | "css" | "typescript"

/** Theme variants */
export type TTheme = "light" | "dark" | "system"
