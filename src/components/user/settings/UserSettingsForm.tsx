"use client"

import { updateDisplayNameAction } from "@/app/user/settings/actions"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import {
	Box,
	Button,
	CardContent,
	CardHeader,
	CircularProgress,
	Fade,
	TextField,
} from "@mui/material"
import { useActionState, useEffect, useState } from "react"
import { displayNameSchema } from "../../../../schema"
import { Profile } from "@/db/schema"
import DoneIcon from "@mui/icons-material/Done"
import { startTransition } from "react"
import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"

type UserSettingsFormProps = {
	profile: Partial<Profile>
}

export function UserSettingsForm({ profile }: UserSettingsFormProps) {
	const [state, action, isPending] = useActionState(
		updateDisplayNameAction,
		null,
	)
	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: displayNameSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		onSubmit: (event, { formData }) => {
			event.stopPropagation()
			startTransition(() => action(formData))
		},
	})

	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		if (state?.status === "success") {
			setIsSuccess(true)
			const timer = setTimeout(() => {
				setIsSuccess(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [state?.status])

	return (
		<ResponsiveCard>
			<CardHeader title='Innstillinger' />
			<CardContent>
				<Box
					component='form'
					id={form.id}
					onSubmit={form.onSubmit}
					action={action}
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						{...getInputProps(fields.displayName, {
							type: "text",
						})}
						key={fields.displayName.key}
						label='Navn'
						fullWidth
						defaultValue={profile?.displayName}
						error={!!fields.displayName.errors}
						helperText={fields.displayName.errors}
					/>
					<Button
						variant='contained'
						type='submit'
						endIcon={
							<Fade in={isSuccess} timeout={{ enter: 500, exit: 1000 }}>
								<DoneIcon />
							</Fade>
						}
						disabled={isPending}
					>
						{isPending ? <CircularProgress /> : "Lagre"}
					</Button>
				</Box>
			</CardContent>
		</ResponsiveCard>
	)
}
