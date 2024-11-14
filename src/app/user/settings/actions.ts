"use server"

import { parseWithZod } from "@conform-to/zod"
import { displayNameSchema } from "../../../../schema"
import { updateProfile } from "@/data-access/profiles"
import { getCurrentUser } from "@/db/sessions"
import { revalidatePath } from "next/cache"

export const updateDisplayNameAction = async (
	_prevState: unknown,
	formData: FormData,
) => {
	const submission = parseWithZod(formData, {
		schema: displayNameSchema,
	})

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { displayName } = submission.value

	try {
		const user = await getCurrentUser()
		if (!user) {
			return { status: "error", error: "Du er ikke logget inn" }
		}
		await updateProfile(user?.id, { displayName })
	} catch (error) {
		return { status: "error", error: "Noe gikk galt" }
	}

	revalidatePath("/user/settings")

	return { status: "success" }
}
