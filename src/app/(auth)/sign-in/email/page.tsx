"use client"

import { signInAction } from "./actions"
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Link,
	TextField,
} from "@mui/material"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { signInSchema } from "../../../../../schema"
import { useActionState } from "react"

export default function SignInPage() {
	const [state, action] = useActionState(signInAction, null)
	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: signInSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<>
			<Card>
				<CardHeader title='Logg inn' />
				<CardContent>
					<Box
						component='form'
						id={form.id}
						onSubmit={form.onSubmit}
						action={action}
						sx={{ gap: 2, display: "flex", flexDirection: "column" }}
					>
						<TextField
							{...getInputProps(fields.email, {
								type: "email",
							})}
							key={fields.email.key}
							placeholder='Epost'
							error={!!fields.email.errors}
							helperText={fields.email.errors}
						/>
						<TextField
							{...getInputProps(fields.password, {
								type: "password",
							})}
							key={fields.password.key}
							placeholder='Passord'
							error={!!fields.password.errors}
							helperText={fields.password.errors}
						/>
						<Button type='submit' variant='contained' fullWidth>
							Logg inn
						</Button>
						<Link href='/sign-up'>Opprett konto</Link>
						{state?.error && state?.intent?.type === "server" && (
							<Alert color='error'>{state?.error as string}</Alert>
						)}
					</Box>
				</CardContent>
			</Card>
		</>
	)
}
