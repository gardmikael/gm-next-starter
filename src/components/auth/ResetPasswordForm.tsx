"use client"

import { changePasswordAction } from "@/app/(auth)/reset-password/actions"
import { getInputProps, SubmissionResult, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	TextField,
} from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
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
				<Alerts
					success={state?.status === "success"}
					tokenMissing={!token}
					msg={state?.error as string}
				/>
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

const Alerts = ({
	success,
	tokenMissing,
	msg = "Noe gikk galt",
}: {
	success: boolean
	tokenMissing: boolean
	msg?: string
}) => {
	return (
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
					<Button variant='contained' href='/sign-in/email'>
						Logg inn med nytt passord
					</Button>
				</Box>
			</FormAlert>
			<FormAlert
				type='error'
				visibleOn={!success}
				msg={{
					title: "Feil",
					body: msg,
				}}
			/>
			<FormAlert
				visibleOn={tokenMissing}
				type='error'
				msg={{
					body: "Token mangler",
				}}
			/>
		</Box>
	)
}
