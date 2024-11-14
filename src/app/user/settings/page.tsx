import { getCurrentUser } from "@/db/sessions"
import { getUserProfileUseCase } from "@/use-cases/users"
import {
	Card,
	Box,
	TextField,
	CardContent,
	CardHeader,
	Skeleton,
	Button,
} from "@mui/material"
import { cache, Suspense, useActionState } from "react"
import { displayNameSchema } from "../../../../schema"
import { updateDisplayNameAction } from "./actions"
import { UserSettingsForm } from "@/components/user/settings/UserSettingsForm"

const profilerLoader = cache(getUserProfileUseCase)

export default async function SettingsPage() {
	const user = await getCurrentUser()
	const isSignedIn = !!user

	let profile = null

	if (isSignedIn) {
		profile = await profilerLoader(user.id)
	}

	if (!profile) {
		return <Skeleton />
	}
	return (
		<Card>
			<CardHeader title='Innstillinger' />
			<CardContent>
				<UserSettingsForm profile={profile} />
			</CardContent>
		</Card>
	)
}
