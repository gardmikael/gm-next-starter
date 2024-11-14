import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react"
import { useMediaQuery } from "@mui/material"
import { ColorMode } from "@/types"

type ColorModeContextProps = {
	toggleColorMode: () => void
	mode: ColorMode.Dark | ColorMode.Light
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(
	undefined,
)

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const [mode, setMode] = useState<ColorMode>(ColorMode.Dark)

	useEffect(() => {
		setMode(prefersDarkMode ? ColorMode.Dark : ColorMode.Light)
	}, [prefersDarkMode])

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light,
				)
			},
			mode,
		}),
		[mode],
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			{children}
		</ColorModeContext.Provider>
	)
}

export const useColorMode = () => {
	const context = useContext(ColorModeContext)
	if (!context) {
		throw new Error("useColorMode must be used within a ColorModeProvider")
	}
	return context
}
