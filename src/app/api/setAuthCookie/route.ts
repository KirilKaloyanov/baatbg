import { admin } from "@firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";



    export async function POST(req: NextRequest) {
        const {idToken}  = await req.json();

        try {
            const { uid } = await admin.auth().verifyIdToken(idToken);
            if (uid) {
                const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: 60 * 60 * 1000 });

                return new Response( JSON.stringify({ message: "Cookie set successfully" }), {
                    status: 200,
                    headers: { 
                        "Set-Cookie": `admin-auth-cookie=${sessionCookie}; HttpOnly; Max-Age=${60 * 60 * 1}; Path=/dashboard; SameSite: Strict; ${process.env.NODE_ENV==='production' ? 'Secure;' : ''}`
                    }
                });
            } else throw new Error("Invalid token.")
        } catch (err) {
            console.error("Error setting cookie:", err);
            return Response.json({ message: "Failed to set cookie"});
        }
    }



// await admin.auth().verifyIdToken(idToken)
// const expiresIn = 60 * 60 * 5
// const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
// return new Response( JSON.stringify({ message: "Cookie set successfully" }), {
//             status: 200,
//             headers: { 
//                 "Set-Cookie": `admin-auth-cookie=${idToken}; HttpOnly; Max-Age=${expiresIn}; Path=/dashboard; ${process.env.NODE_ENV==='production' ? 'Secure;' : ''}`
//             }
//         });