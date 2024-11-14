"use client"

import * as React from "react"
import { ThemeProvider } from "@mui/material/styles"
import type { ThemeOptions } from "@mui/material/styles"
import { getTheme } from "./themePrimitives"
import { useColorMode } from "@/context/ColorMode"

interface AppThemeProps {
	children: React.ReactNode
	disableCustomTheme?: boolean
	themeComponents?: ThemeOptions["components"]
}

export default function AppTheme({ children }: AppThemeProps) {
	const { mode } = useColorMode()
	const theme = getTheme(mode)

	return (
		<ThemeProvider theme={theme} disableTransitionOnChange>
			{children}
		</ThemeProvider>
	)
}
