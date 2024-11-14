import { createServerActionProcedure } from "zsa"
import { PublicError } from "../use-cases/errors"
import { assertAuthenticated } from "@/db/sessions"

function shapeErrors({ err }: any) {
	const isAllowedError = err instanceof PublicError

	const isDev = process.env.NODE_ENV === "development"
	if (isAllowedError || isDev) {
		console.error(err)
		return {
			code: err.code ?? "ERROR",
			message: `${isDev ? "DEV ONLY ENABLED - " : ""}${err.message}`,
		}
	} else {
		return {
			code: "ERROR",
			message: "Something went wrong",
		}
	}
}

export const authenticatedAction = createServerActionProcedure()
	.experimental_shapeError(shapeErrors)
	.handler(async () => {
		const user = await assertAuthenticated()
		return { user }
	})

export const unauthenticatedAction = createServerActionProcedure()
	.experimental_shapeError(shapeErrors)
	.handler(async () => {
		return { user: undefined }
	})
