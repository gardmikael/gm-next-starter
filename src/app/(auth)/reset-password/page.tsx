"use client"

import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import { Skeleton } from "@mui/material"

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<Skeleton />}>
			<ResetPasswordForm />
		</Suspense>
	)
}
