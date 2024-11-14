"use client"

import * as React from "react"
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography,
} from "@mui/material"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { MagicLinkForm } from "@/components/auth/MagicLinkForm"
import GoogleSignIn from "@/components/auth/GoogleSignIn"

export default function SignInPage() {
	return (
		<Card sx={{ maxWidth: "500px", mx: "auto" }}>
			<CardHeader title='Logg inn' />
			<CardContent>
				<GoogleSignIn />
				{/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<GoogleIcon />}
						href='/api/login/google'
					>
						Logg inn med Google
					</Button>
				</Box> */}
				<Divider sx={{ my: 4 }}>eller</Divider>

				<MagicLinkForm />
				{/* <Divider sx={{ my: 4 }}>andre alternativ</Divider>
			<EmailSignIn /> */}
			</CardContent>
		</Card>
	)
}
