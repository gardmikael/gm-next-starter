import { getCurrentUser } from "@/db/sessions"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const user = await getCurrentUser()

	if (!user) redirect("/sign-in")

	return (
		<Card>
			<CardHeader title='Dashboard' />
			<CardContent>
				<Typography variant='body1'>
					Velkommen til dashboardet. Dette vil du bare se dersom brukeren er
					autentisert.
				</Typography>
			</CardContent>
		</Card>
	)
}
