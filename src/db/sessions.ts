import { cookies } from "next/headers"
import {
	createSession,
	generateSessionToken,
	validateRequest,
} from "@/lib/auth"
import { AuthenticationError } from "@/use-cases/errors"
import { cache } from "react"

const SESSION_COOKIE_NAME = "session"

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
	const cookieStore = await cookies()

	cookieStore.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/",
	})
}

export async function deleteSessionTokenCookie() {
	const cookieStore = await cookies()
	cookieStore.set(SESSION_COOKIE_NAME, "", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
		path: "/",
	})
}

export async function getSessionToken() {
	const cookieStore = await cookies()
	return cookieStore.get(SESSION_COOKIE_NAME)?.value
}

export const getCurrentUser = cache(async () => {
	const { user } = await validateRequest()
	return user ?? undefined
})

export const assertAuthenticated = async () => {
	const user = await getCurrentUser()
	if (!user) {
		throw new AuthenticationError()
	}
	return user
}

export async function setSession(userId: number) {
	const token = generateSessionToken()
	const session = await createSession(token, userId)

	await setSessionTokenCookie(token, session.expiresAt)
}
