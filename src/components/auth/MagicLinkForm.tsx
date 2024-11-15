import { signInMagicLinkAction } from "@/app/(auth)/sign-in/actions"
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { magicSchema } from "../../../schema"
import { useActionState } from "react"

export const MagicLinkForm = () => {
	const [state, action, isPending] = useActionState(signInMagicLinkAction, null)

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: magicSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Box
			component='form'
			id={form.id}
			onSubmit={form.onSubmit}
			action={action}
			sx={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				gap: 4,
			}}
		>
			<TextField
				{...getInputProps(fields.email, {
					type: "email",
				})}
				key={fields.email.key}
				label='Epost'
				variant='outlined'
				fullWidth
				size='small'
			/>

			<Button type='submit' variant='outlined' fullWidth disabled={isPending}>
				{isPending ? <CircularProgress /> : "Send meg en lenke"}
			</Button>
			{state?.error && (
				<Alert severity='error'>{JSON.stringify(state.error)}</Alert>
			)}
		</Box>
	)
}
