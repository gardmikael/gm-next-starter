"use client"

import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import { FormSkeleton } from "@/components/surfaces/FormSkeleton"

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<FormSkeleton />}>
			<ResetPasswordForm />
		</Suspense>
	)
}
