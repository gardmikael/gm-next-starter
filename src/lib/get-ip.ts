import { headers } from "next/headers"

export async function getIp() {
	const nextHeaders = await headers()
	const forwardedFor = nextHeaders.get("x-forwarded-for")
	const realIp = nextHeaders.get("x-real-ip")

	if (forwardedFor) {
		return forwardedFor.split(",")[0].trim()
	}

	if (realIp) {
		return realIp.trim()
	}

	return null
}
