"use server"

import { afterLoginUrl } from "@/app-config"
import { rateLimitByIp } from "@/lib/limiter"
import { registerUserUseCase } from "@/use-cases/users"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { registrationSchema } from "../../../../schema"
import { setSession } from "@/db/sessions"

export const signUpAction = async (_prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: registrationSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { email, password } = submission.value

	try {
		await rateLimitByIp({ key: "register", limit: 3, window: 30000 })
		const user = await registerUserUseCase(email, password)
		await setSession(user.id)
	} catch (error) {
		console.error(error)
	}

	return redirect(afterLoginUrl)
}
