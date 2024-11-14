import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material"
import Link from "next/link"

export default function VerifySuccess() {
	return (
		<Card>
			<CardHeader title='Gratulerer' />
			<CardContent>
				<Typography variant='subtitle1'>
					Eposten din er nå verifisert. Du kan nå logge inn.
				</Typography>

				<Box sx={{ py: 2 }}>
					<Button variant='contained' href='/sign-in/email'>
						Logg inn
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
}
