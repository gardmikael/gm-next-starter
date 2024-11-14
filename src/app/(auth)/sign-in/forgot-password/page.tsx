"use client"

import { resetPasswordAction } from "./actions"
import {
	Box,
	Button,
	CardContent,
	CardHeader,
	CircularProgress,
	TextField,
} from "@mui/material"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { resetPasswordSchema } from "../../../../../schema"
import { useActionState } from "react"
import { Intent } from "@/types"
import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"
import FormAlert from "@/components/feedback/FormAlert"

export default function ForgotPasswordPage() {
	const [state, action, isPending] = useActionState(resetPasswordAction, null)
	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: resetPasswordSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const success = state?.status === "success"

	return (
		<ResponsiveCard>
			<CardHeader title='Glemt passordet?' />
			<CardContent>
				<Box
					component='form'
					id={form.id}
					onSubmit={form.onSubmit}
					action={action}
					sx={{ gap: 3, display: "flex", flexDirection: "column" }}
				>
					{!success && (
						<TextField
							{...getInputProps(fields.email, {
								type: "email",
							})}
							key={fields.email.key}
							placeholder='Epost'
							fullWidth
							error={!!fields.email.errors}
							helperText={fields.email.errors}
						/>
					)}

					<FormAlert
						visibleOn={!!(!success && state?.error && "server" in state.error)}
						type='error'
						msg={state?.error?.server ? state.error.server[0] : ""}
					/>
					<FormAlert
						visibleOn={success}
						type='success'
						msg='Vi har sendt deg en e-post med instruksjoner for å tilbakestille passordet ditt'
					/>

					{!success && (
						<Button
							type='submit'
							variant='contained'
							fullWidth
							disabled={isPending}
						>
							{isPending ? <CircularProgress /> : "Send meg reset-lenke"}
						</Button>
					)}
				</Box>
			</CardContent>
		</ResponsiveCard>
	)
}
