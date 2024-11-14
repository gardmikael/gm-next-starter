"use server"

import { afterLoginUrl } from "@/app-config"
import { rateLimitByKey } from "@/lib/limiter"
import { signInUseCase } from "@/use-cases/users"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { signInSchema } from "../../../../../schema"
import { setSession } from "@/db/sessions"

export const signInAction = async (_prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: signInSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { email, password } = submission.value

	try {
		await rateLimitByKey({ key: email, limit: 3, window: 10000 })
		try {
			const user = await signInUseCase(email, password)
			await setSession(user.id)
		} catch (error) {
			console.error(error)
			return {
				success: false,
				intent: {
					type: "server",
				},
				error: "Feil e-post eller passord",
			}
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			error: "Noe gikk galt",
		}
	}

	redirect(afterLoginUrl)
}
