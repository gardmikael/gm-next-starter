"use client"

import { Box, Button, CircularProgress } from "@mui/material"
import { GoogleIcon } from "../icons/GoogleIcon"
import { useState } from "react"

export default function GoogleSignIn() {
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		setIsLoading(true)
		const href = e.currentTarget.href
		// Simulate navigation delay
		setTimeout(() => {
			window.location.href = href
			setIsLoading(false)
		}, 1000)
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Button
				fullWidth
				variant='outlined'
				startIcon={!isLoading ? <GoogleIcon /> : undefined}
				onClick={handleClick}
				href='/api/login/google'
				disabled={isLoading}
			>
				{isLoading ? <CircularProgress /> : "Logg inn med Google"}
			</Button>
		</Box>
	)
}
