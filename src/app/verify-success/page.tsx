"use client"

import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"
import { Box, Button, CardContent, CardHeader, Typography } from "@mui/material"

export default function VerifySuccess() {
	return (
		<ResponsiveCard>
			<CardHeader title='Gratulerer' />
			<CardContent>
				<Typography variant='subtitle1'>
					Eposten din er nå verifisert. Du kan nå logge inn.
				</Typography>

				<Box sx={{ pt: 2 }}>
					<Button variant='contained' href='/sign-in/email'>
						Logg inn
					</Button>
				</Box>
			</CardContent>
		</ResponsiveCard>
	)
}
