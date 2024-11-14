import { Card, CardHeader, CardContent } from "@mui/material"

export default function MagicLinkPage() {
	return (
		<Card>
			<CardHeader title='Sjekk eposten din' />
			<CardContent>
				Vi har sendt deg en magisk lenke for å logge inn. Klikk på lenken i
				eposten din for å logge inn.
			</CardContent>
		</Card>
	)
}
