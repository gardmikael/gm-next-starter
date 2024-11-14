import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic"
import { googleAuth } from "@/lib/auth"
import { createGoogleUserUseCase } from "@/use-cases/users"
import { getAccountByGoogleIdUseCase } from "@/use-cases/accounts"
import { afterLoginUrl } from "@/app-config"
import { setSession } from "@/db/sessions"
import { GoogleUser } from "@/types"

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")
	const cookieStore = await cookies()
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null

	if (
		!code ||
		!state ||
		!storedState ||
		state !== storedState ||
		!codeVerifier
	) {
		return new Response(null, {
			status: 400,
		})
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(
			code,
			codeVerifier,
		)
		const response = await fetch(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		)
		const googleUser: GoogleUser = await response.json()

		const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub)

		if (existingAccount) {
			await setSession(existingAccount.userId)
			return new Response(null, {
				status: 302,
				headers: {
					Location: afterLoginUrl,
				},
			})
		}

		const userId = await createGoogleUserUseCase(googleUser)
		await setSession(userId)
		return new Response(null, {
			status: 302,
			headers: {
				Location: afterLoginUrl,
			},
		})
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			})
		}
		console.error(e)
		return new Response(null, {
			status: 500,
		})
	}
}
