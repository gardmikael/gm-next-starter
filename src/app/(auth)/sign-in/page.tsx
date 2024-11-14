"use client"

import * as React from "react"
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Link,
	Typography,
} from "@mui/material"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { MagicLinkForm } from "@/components/auth/MagicLinkForm"
import GoogleSignIn from "@/components/auth/GoogleSignIn"
import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"

export default function SignInPage() {
	return (
		<ResponsiveCard>
			<CardHeader title='Logg inn' />
			<CardContent>
				<GoogleSignIn />
				<Divider sx={{ my: 4 }}>eller</Divider>
				<MagicLinkForm />
				<Divider sx={{ my: 4 }}>eller</Divider>
				<Link href='/sign-in/email'>Logg inn med epost og passord</Link>
			</CardContent>
		</ResponsiveCard>
	)
}
