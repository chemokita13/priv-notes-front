import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function is for controll and protect /notes/* path
export function middleware(request: NextRequest) {
    // if exists access_token cookie, then continue
    if (request.cookies.get("access_token")) {
        //console.log(request.cookies.get("access_token"));
        return NextResponse.next();
    }
    // if not exists access_token cookie, then redirect to index page
    return NextResponse.redirect(new URL("/", request.url));
}

// Only active in /notes/** path
export const config = {
    matcher: "/notes/:path*",
};
