import type { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"
import { ReactNode } from "react"
import { AppBar } from "../components/layout/AppBar"
import { Container } from "@mui/material"
import { Providers } from "@/context/Providers"

export const metadata: Metadata = {
	title: "Next starter",
	icons: [
		{ rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
	],
	description: "A simple next.js template including drizzle and lucia auth",
}

export default async function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body suppressHydrationWarning={true}>
				<Providers>
					<NextTopLoader />
					<AppBar />
					<Container sx={{ py: 4 }}>{children}</Container>
				</Providers>
			</body>
		</html>
	)
}
