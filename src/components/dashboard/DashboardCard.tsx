"use client"

import { CardContent, CardHeader, Typography } from "@mui/material"
import { ResponsiveCard } from "../surfaces/ResponsiveCard"

export function DashboardCard() {
	return (
		<ResponsiveCard>
			<CardHeader title='Dashboard' />
			<CardContent>
				<Typography variant='body1'>
					Velkommen til dashboardet. Dette vil du bare se dersom brukeren er
					autentisert.
				</Typography>
			</CardContent>
		</ResponsiveCard>
	)
}
