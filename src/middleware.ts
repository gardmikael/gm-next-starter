import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
	const sessionToken = request.cookies.get("session")
	if (!sessionToken) {
		return NextResponse.redirect(new URL("/sign-in", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/user/settings"],
	//matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/:path*"],
}
