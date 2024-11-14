import { Raleway } from "next/font/google"

import { extendTheme, darken } from "@mui/material"

const raleway = Raleway({
	weight: ["400"],
	subsets: ["latin"],
})

const lightColors = {
	primary: "#ffffff",
	secondary: "#52b785",
	accent: "#4e8bac",
}

const darkColors = {
	primary: "#070707",
	secondary: "#4e8bac",
	accent: "#ff6969",
}

export const theme = extendTheme({
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
		MuiCircularProgress: {
			defaultProps: {
				size: 25,
			},
		},
	},
	colorSchemes: {
		light: {
			palette: {
				background: {
					default: lightColors.primary,
					paper: darken(lightColors.primary, 0.05),
				},
			},
		},
		dark: {
			palette: {
				background: {
					default: darkColors.primary,
				},
			},
		},
	},
})
