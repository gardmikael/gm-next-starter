"use client"

import { ResponsiveCard } from "@/components/surfaces/ResponsiveCard"
import { CardContent, CardHeader } from "@mui/material"

export default function SignedOutPage() {
	return (
		<ResponsiveCard>
			<CardHeader title='Hadet bra!' />
			<CardContent>Du er nå logget ut. Takk for at du besøkte oss!</CardContent>
		</ResponsiveCard>
	)
}
