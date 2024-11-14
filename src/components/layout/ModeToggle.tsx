import { Box, IconButton, Switch } from "@mui/material"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import { useColorMode } from "@/context/ColorMode"

const ThemeToggleButton = () => {
	const { toggleColorMode, mode } = useColorMode()

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<IconButton onClick={() => toggleColorMode()} sx={{ mr: 1 }}>
				{mode === "dark" ? <Brightness4 /> : <Brightness7 />}
			</IconButton>
			<Switch
				id='theme-toggle'
				checked={mode === "dark"}
				onChange={() => toggleColorMode()}
			/>
		</Box>
	)
}

export default ThemeToggleButton
