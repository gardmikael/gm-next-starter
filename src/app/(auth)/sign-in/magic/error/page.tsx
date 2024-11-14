"use client"

import { Card } from "@/components/Card"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function MagicLinkPage() {
	return (
		<Box>
			<Card>
				<Typography variant='h2' component='h1'>
					Utgått token
				</Typography>
				<Typography variant='body1'>
					Beklager, tokenet har enten utgått eller re allerede brukt. Vennligst
					prøv å logge inn igjen
				</Typography>

				<Button LinkComponent={Link} variant='contained' href='/sign-in'>
					Logg inn
				</Button>
			</Card>
		</Box>
	)
}
