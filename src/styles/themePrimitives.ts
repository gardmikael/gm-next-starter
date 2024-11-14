import { Raleway } from "next/font/google"

import { createTheme, lighten } from "@mui/material"
import { darken } from "@mui/material"

const raleway = Raleway({
	weight: ["400"],
	subsets: ["latin"],
})

const commonTheme = {
	typography: {
		fontFamily: raleway.style.fontFamily,
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: "none",
				},
			},
		},
		MuiBox: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "column",
					gap: 2,
				},
			},
		},
	},
}

const lightColors = {
	primary: "#ffffff",
	secondary: "#52b785",
	accent: "#4e8bac",
}

const lightTheme = createTheme({
	...commonTheme,
	palette: {
		mode: "light",
		background: {
			default: lightColors.primary,
		},
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					color: lightColors.accent,
					fontWeight: "bold",
					"&:hover": {
						color: darken(lightColors.primary, 0.2),
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: lighten(lightColors.primary, 0.1),
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: lightColors.secondary,
				},
			},
		},
	},
})

const darkColors = {
	primary: "#070707",
	secondary: "#4e8bac",
	accent: "#ff6969",
}

const darkTheme = createTheme({
	...commonTheme,
	palette: {
		mode: "dark",
		background: {
			default: darkColors.primary,
		},
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					color: darkColors.accent,
					fontWeight: "bold",
					"&:hover": {
						color: darken(darkColors.accent, 0.2),
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: lighten(darkColors.primary, 0.1),
				},
			},
		},
		MuiCircularProgress: {
			defaultProps: {
				size: 25,
			},
		},
	},
})

export const getTheme = (mode: "light" | "dark") =>
	mode === "light" ? lightTheme : darkTheme
