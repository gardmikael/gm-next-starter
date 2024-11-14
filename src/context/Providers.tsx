"use client"

import { ReactNode } from "react"
import AppTheme from "@/styles/AppTheme"
import { CssBaseline } from "@mui/material"
import { ColorModeProvider } from "@/context/ColorMode"

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ColorModeProvider>
			<AppTheme>
				<CssBaseline />
				{children}
			</AppTheme>
		</ColorModeProvider>
	)
}
