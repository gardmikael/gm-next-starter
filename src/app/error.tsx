"use client"

import { Typography } from "@mui/material"

export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string }
}) {
	return (
		<>
			<Typography variant='h1'>Opps! Noe gikk galt</Typography>
			<Typography variant='body1'>{error.message}</Typography>
		</>
	)
}
