"use server"

import { resetPasswordUseCase } from "@/use-cases/users"
import { rateLimitByKey } from "@/lib/limiter"
import { parseWithZod } from "@conform-to/zod"
import { resetPasswordSchema } from "../../../../../schema"
import { getUserByEmail } from "@/data-access/users"
import { getAccountByUserId } from "@/data-access/accounts"
import { SubmissionResult } from "@conform-to/react"

export const resetPasswordAction = async (
	_prevState: unknown,
	formData: FormData,
): Promise<SubmissionResult> => {
	const submission = parseWithZod(formData, {
		schema: resetPasswordSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { email } = submission.value

	try {
		const user = await getUserByEmail(email)
		const error = {
			status: "error",
			error: { server: ["Kan ikke resette passord for denne eposten"] },
		} as SubmissionResult

		if (!user) {
			return error
		}
		const account = await getAccountByUserId(user.id)
		if (account?.accountType !== "email") {
			return error
		}
		await rateLimitByKey({ key: email, limit: 1, window: 30000 })
		await resetPasswordUseCase(email)
	} catch (error) {
		return {
			status: "error",
			error: { server: ["Kan ikke resette passord for denne eposten"] },
		}
	}

	return {
		status: "success",
	}
}
