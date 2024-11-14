import { getCurrentUser } from "@/db/sessions"
import { getUserProfileUseCase } from "@/use-cases/users"
import { cache, Suspense } from "react"
import { UserSettingsForm } from "@/components/user/settings/UserSettingsForm"
import { FormSkeleton } from "@/components/surfaces/FormSkeleton"
import { redirect } from "next/navigation"

const profilerLoader = cache(getUserProfileUseCase)

export default async function SettingsPage() {
	const user = await getCurrentUser()
	const isSignedIn = !!user

	let profile = null

	if (isSignedIn) {
		profile = await profilerLoader(user.id)
	} else {
		profile = { id: -1, displayName: "Guest" }
	}

	/* if (!profile) {
		redirect("/sign-in")
	} */
	return (
		<Suspense fallback={<FormSkeleton />}>
			<UserSettingsForm profile={profile} />
		</Suspense>
	)
}
