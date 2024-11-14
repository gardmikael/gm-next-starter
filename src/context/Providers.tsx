"use client"

import { ReactNode } from "react"
import AppTheme from "@/styles/AppTheme"
import { CssBaseline } from "@mui/material"

export function Providers({ children }: { children: ReactNode }) {
	return (
		<AppTheme>
			<CssBaseline />
			{children}
		</AppTheme>
	)
}
