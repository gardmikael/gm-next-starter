"use server"

import { resetPasswordUseCase } from "@/use-cases/users"
import { rateLimitByKey } from "@/lib/limiter"
import { parseWithZod } from "@conform-to/zod"
import { resetPasswordSchema } from "../../../../../schema"

export const resetPasswordAction = async (
	_prevState: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: resetPasswordSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { email } = submission.value

	try {
		await rateLimitByKey({ key: email, limit: 1, window: 30000 })
		await resetPasswordUseCase(email)
	} catch (error) {
		console.error(error)
		return {
			intent: {
				type: "server",
			},
			error: "An unknown error occurred",
		}
	}
	return {
		status: "success",
	}
}
