"use server"

import { rateLimitByIp } from "@/lib/limiter"
import { changePasswordUseCase } from "@/use-cases/users"
import { parseWithZod } from "@conform-to/zod"
import { resetPasswordTokenSchema } from "../../../../schema"
import { AuthenticationError, TokenNotFoundError } from "@/use-cases/errors"

export const changePasswordAction = async (
	_prevState: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: resetPasswordTokenSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { token, password } = submission.value

	try {
		await rateLimitByIp({ key: "change-password", limit: 2, window: 30000 })
		await changePasswordUseCase(token, password)
	} catch (error) {
		// log error message
		if (
			error instanceof AuthenticationError ||
			error instanceof TokenNotFoundError
		) {
			return { status: "error", error: error.message }
		}

		return { status: "error", error: "Noe gikk galt" }
	}

	return { status: "success" }
}
