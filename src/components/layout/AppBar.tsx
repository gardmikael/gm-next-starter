import * as React from "react"
import Container from "@mui/material/Container"
import { AppBar as MuiAppBar } from "@mui/material"
import { AppBarContent } from "@/components/layout/AppBarContent"
import { cache } from "react"
import { getUserProfileUseCase } from "@/use-cases/users"
import { getCurrentUser } from "@/db/sessions"

const profilerLoader = cache(getUserProfileUseCase)

export const AppBar = async () => {
	const user = await getCurrentUser()
	const isSignedIn = !!user

	let profile = null

	if (isSignedIn) {
		profile = await profilerLoader(user.id)
	}

	return (
		<MuiAppBar
			position='static'
			variant='outlined'
			elevation={0}
			sx={{
				boxShadow: "none",
				border: "none",
				"& .MuiOutlinedInput-root": {
					"& fieldset": { borderColor: "transparent" },
				},
			}}
		>
			<AppBarContent profile={profile} />
		</MuiAppBar>
	)
}
