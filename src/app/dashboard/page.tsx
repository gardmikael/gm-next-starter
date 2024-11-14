import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { getCurrentUser } from "@/db/sessions"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const user = await getCurrentUser()

	if (!user) redirect("/sign-in")

	return <DashboardCard />
}
