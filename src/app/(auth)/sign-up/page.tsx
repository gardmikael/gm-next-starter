"use client"

import { signUpAction } from "./actions"
import {
	Card,
	Box,
	Button,
	CardContent,
	CardHeader,
	TextField,
	CircularProgress,
} from "@mui/material"
import { registrationSchema } from "../../../../schema"
import { parseWithZod } from "@conform-to/zod"
import { getInputProps, useForm } from "@conform-to/react"
import { useActionState } from "react"
import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"

export default function RegisterPage() {
	const [state, action, isPending] = useActionState(signUpAction, null)

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: registrationSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<ResponsiveCard>
			<CardHeader title='Registrer deg' />
			<CardContent>
				<Box
					component='form'
					action={action}
					id={form.id}
					onSubmit={form.onSubmit}
					sx={{ gap: 4, display: "flex", flexDirection: "column" }}
				>
					<TextField
						{...getInputProps(fields.email, {
							type: "email",
						})}
						key={fields.email.key}
						fullWidth
						label='Epost'
						autoComplete='username email'
					/>
					<TextField
						{...getInputProps(fields.password, {
							type: "password",
						})}
						key={fields.password.key}
						fullWidth
						label='Passord'
						autoComplete='new-password'
					/>
					<TextField
						{...getInputProps(fields.passwordConfirmation, {
							type: "password",
						})}
						key={fields.passwordConfirmation.key}
						fullWidth
						label='Bekreft passord'
						autoComplete='new-password'
					/>

					<Button
						type='submit'
						variant='outlined'
						fullWidth
						disabled={isPending}
					>
						{isPending ? <CircularProgress /> : "Registrer deg"}
					</Button>
				</Box>
			</CardContent>
		</ResponsiveCard>
	)
}
