"use client"

import { changePasswordAction } from "@/app/(auth)/reset-password/actions"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Link,
	TextField,
	Typography,
} from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { resetPasswordTokenSchema } from "../../../schema"
import FormAlert from "../feedback/FormAlert"

export const ResetPasswordForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get("token") ?? null

	const [state, action] = useActionState(changePasswordAction, null)
	const [form, fields] = useForm({
		defaultValue: { token: token },
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: resetPasswordTokenSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const success = state?.status === "success"

	return (
		<Card sx={{ width: "60%", mx: "auto" }}>
			<CardHeader title='Oppdater passord' />
			<CardContent>
				<Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
					<FormAlert
						visibleOn={success}
						msg={{
							title: "Passord oppdaert",
							body: "Ditt passord har blitt oppdatert.",
						}}
						type='success'
					>
						<Box sx={{ mt: 2 }}>
							<Button
								LinkComponent={Link}
								variant='contained'
								href='/sign-in/email'
							>
								Logg inn med nytt passord
							</Button>
						</Box>
					</FormAlert>
					<FormAlert
						type='error'
						visibleOn={!success && !!state?.error}
						msg={{
							title: "Feil",
							body: state?.error as string,
						}}
					/>
					<FormAlert
						type='error'
						visibleOn={!token}
						msg={{
							body: "Token mangler",
						}}
					/>
				</Box>
				{!success && (
					<Box
						component='form'
						id={form.id}
						action={action}
						onSubmit={form.onSubmit}
						sx={{ gap: 4, display: "flex", flexDirection: "column" }}
					>
						<TextField
							{...getInputProps(fields.password, {
								type: "password",
							})}
							key={fields.password.key}
							label='Passord'
							error={!!fields.password.errors}
							helperText={fields.password.errors}
							autoComplete='new-password'
						/>
						<TextField
							{...getInputProps(fields.passwordConfirmation, {
								type: "password",
							})}
							key={fields.passwordConfirmation.key}
							label='Gjenta passord'
							error={!!fields.passwordConfirmation.errors}
							helperText={fields.passwordConfirmation.errors}
							autoComplete='new-password'
						/>
						<input
							{...getInputProps(fields.token, {
								type: "hidden",
							})}
							key={fields.token.key}
						/>
						<Button type='submit' variant='contained' fullWidth>
							Oppdater
						</Button>
					</Box>
				)}
			</CardContent>
		</Card>
	)
}
