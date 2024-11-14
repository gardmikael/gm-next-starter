import { invalidateSession, validateRequest } from "@/lib/auth"

export async function GET(request: Request) {
	const { session } = await validateRequest()

	if (!session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/sign-in",
			},
		})
	}

	await invalidateSession(session.id)

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/",
		},
	})
}
