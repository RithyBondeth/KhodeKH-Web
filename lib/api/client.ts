const API_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured")
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
  })

  if (!res.ok) {
    throw new ApiError(res.status, `${path} failed with ${res.status}`)
  }

  return res.json() as Promise<T>
}
