import { googleAuth } from "@/lib/auth"
import { cookies } from "next/headers"
import { generateCodeVerifier, generateState } from "arctic"

export async function GET(): Promise<Response> {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()

	const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	})

	const cookieStore = await cookies()
	cookieStore.set("google_oauth_state", state, {
		secure: true,
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
	})

	cookieStore.set("google_code_verifier", codeVerifier, {
		secure: true,
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
	})

	return Response.redirect(url)
}
