import { z } from "zod"

const EMAIL_REQUIRED_MSG = "Epost er påkrevd"
const EMAIL_INVALID_MSG = "Epost er ugyldig"
const PASSWORD_REQUIRED_MSG = "Passord er påkrevd"
const PASSWORD_MISMATCH_MSG = "Passordene matcher ikke"
const PASSWORD_MIN_LENGTH_MSG = "Passordet må være minst 8 tegn langt"

export const magicSchema = z.object({
	email: z
		.string({ required_error: EMAIL_REQUIRED_MSG })
		.email({ message: EMAIL_INVALID_MSG }),
})

export const signInSchema = z.object({
	email: z
		.string({ required_error: EMAIL_REQUIRED_MSG })
		.email({ message: EMAIL_INVALID_MSG }),
	password: z
		.string({ required_error: PASSWORD_REQUIRED_MSG })
		.min(8, PASSWORD_MIN_LENGTH_MSG),
})

export const registrationSchema = z
	.object({
		email: z.string({ required_error: EMAIL_REQUIRED_MSG }).email(),
		password: z
			.string({ required_error: PASSWORD_REQUIRED_MSG })
			.min(8, PASSWORD_MIN_LENGTH_MSG),
		passwordConfirmation: z.string().min(8, PASSWORD_MIN_LENGTH_MSG),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: PASSWORD_MISMATCH_MSG,
		path: ["passwordConfirmation"],
	})

export const changePasswordSchema = z.object({
	token: z.string(),
	password: z.string().min(8, PASSWORD_MIN_LENGTH_MSG),
})

export const resetPasswordSchema = z.object({
	email: z
		.string({ required_error: EMAIL_REQUIRED_MSG })
		.email({ message: EMAIL_INVALID_MSG }),
})

export const resetPasswordTokenSchema = z
	.object({
		password: z
			.string({ required_error: PASSWORD_REQUIRED_MSG })
			.min(8, PASSWORD_MIN_LENGTH_MSG),
		token: z.string({ required_error: "Det mangler token" }),
		passwordConfirmation: z
			.string({ required_error: PASSWORD_REQUIRED_MSG })
			.min(8, PASSWORD_MIN_LENGTH_MSG),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: PASSWORD_MISMATCH_MSG,
		path: ["passwordConfirmation"],
	})

export const displayNameSchema = z.object({
	displayName: z.string().min(3),
})
