import MuiCard from "@mui/material/Card"
import { ReactNode } from "react"

export const Card = ({ children }: { children: ReactNode }) => (
	<MuiCard
		sx={{
			display: "flex",
			flexDirection: "column",
			alignSelf: "center",
			padding: 4, // theme.spacing(4)
			gap: 2, // theme.spacing(2)
			margin: "2rem auto",
			boxShadow:
				"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
			maxWidth: { sm: "450px" }, // Responsive width for larger screens
			"&.Mui-dark": {
				boxShadow:
					"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
			},
		}}
	>
		{children}
	</MuiCard>
)
