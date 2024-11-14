"use server"

import { rateLimitByKey } from "@/lib/limiter"
import { sendMagicLinkUseCase } from "@/use-cases/magic-link"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { magicSchema } from "../../../../schema"

export const signInMagicLinkAction = async (
	_prevState: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: magicSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { email } = submission.value

	try {
		await rateLimitByKey({ key: email, limit: 1, window: 30000 })
		await sendMagicLinkUseCase(email)
	} catch (error) {
		return {
			success: false,
			error: "Noe gikk galt",
		}
	}
	redirect("/sign-in/magic")
}
