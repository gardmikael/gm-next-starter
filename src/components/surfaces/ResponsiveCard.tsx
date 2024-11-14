import { Card as MuiCard } from "@mui/material"

type ResponsiveCardProps = {
	children: React.ReactNode
	sx?: React.CSSProperties
}
export function ResponsiveCard({ children, sx, ...rest }: ResponsiveCardProps) {
	return (
		<MuiCard
			sx={(theme) => ({
				[theme.breakpoints.up("lg")]: { width: "50%" },
				[theme.breakpoints.up("md")]: { width: "60%" },
				mx: "auto",
				...sx,
			})}
			{...rest}
		>
			{children}
		</MuiCard>
	)
}
