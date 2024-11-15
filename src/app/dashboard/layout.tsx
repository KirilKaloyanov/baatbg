import { admin } from "@firebaseAdminConfig";
import { auth } from "@firebaseConfig";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Login from "@components/login"

export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    
    const cookieStore = await cookies();

    const authCookie = cookieStore.get('admin-auth-cookie')

    const user = await admin.auth();
    if (!authCookie) {
        return redirect('/login')
    } else {
        try {
            const userDetails = await user.verifySessionCookie(authCookie.value)
            
            if (userDetails.uid !== process.env.AUTHORIZED_UID) {
                return <h1>Forbidden resourse</h1>
                // redirect('/')
            } else return <><h1>Dashboard</h1>{ children }</>
        } catch (err) {
            console.log("Invalid credentials or session", err)
            return <h1>Invalid credentials or session</h1>
            // redirect('/')
        }
    }

    

    
}