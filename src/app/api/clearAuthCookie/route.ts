import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res:  NextResponse) {
    try {
        return new Response( JSON.stringify({ message: "Cookie cleared successfully" }), {
            status: 200,
            headers: { 
                "Set-Cookie": `admin-auth-cookie=""; HttpOnly; Max-Age=${0}; Path=/dashboard; ${process.env.NODE_ENV==='production' ? 'Secure;' : ''}`
            }
        });
    } catch (err) {
        console.error("Error clearing cookie:", err);
        return Response.json({ message: "Failed to clear cookie"});
    }
}