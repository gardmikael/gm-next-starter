"use client"

import * as React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./themePrimitives"

type AppThemeProps = {
	children: React.ReactNode
}

export default function AppTheme({ children }: AppThemeProps) {
	return (
		<ThemeProvider theme={theme} defaultMode='light'>
			{children}
		</ThemeProvider>
	)
}
