import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing)

export const config = {
    matcher: ['/', '/(en|bg)/:path*']
}


import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("middleware redirects to root")
    // return NextResponse.redirect(new URL('/', request.url))
    // const idToken = await request.cookies.get('admin-auth-cookie')
    
    // console.log(idToken)
    // if ( typeof idToken == "string") {
    //      admin.auth().verifyIdToken(idToken)

    //     // console.log(decoded)
    //     const user = admin.auth().verifyIdToken(idToken);
    //     return NextResponse.next();
    // } else return new Response("Unauthorized")

}

// export const config = {
//     matcher: "/dashboard/:path*"
// }