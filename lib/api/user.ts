import { apiGet } from "./client"
import type { IApiUser } from "@/utils/interfaces/user/api.interface"

/** Requires an authenticated session — the gateway resolves the id from the JWT. */
export const getMe = () => apiGet<IApiUser>("/user/me")
