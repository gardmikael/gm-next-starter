import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { validateRequest } from "./lib/auth"

export default async function middleware(request: NextRequest) {
	const sessionToken = request.cookies.get("session")
	if (!sessionToken) {
		// Redirect to login if not authenticated
		return NextResponse.redirect(new URL("/sign-in", request.url))
	}

	return NextResponse.next()
}

// Apply middleware to specific routes
export const config = {
	matcher: ["/user/settings"],
	//matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/:path*"],
}
