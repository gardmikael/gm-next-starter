"use client"

import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"
import { Box, Button, CardContent, CardHeader, Typography } from "@mui/material"

export default function MagicLinkPage() {
	return (
		<ResponsiveCard>
			<CardHeader title='Utgått token' />
			<CardContent>
				<Typography variant='body1'>
					Beklager, tokenet har enten utgått eller re allerede brukt. Vennligst
					prøv å logge inn igjen
				</Typography>
				<Box sx={{ mt: 2 }}>
					<Button variant='outlined' href='/sign-in'>
						Logg inn
					</Button>
				</Box>
			</CardContent>
		</ResponsiveCard>
	)
}
