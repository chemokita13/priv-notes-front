import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.cookies.get("access_token")) {
        console.log(request.cookies.get("token"));
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/notes/:path*",
};
