import { admin } from "@firebaseAdminConfig"
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import Link from "next/link";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";

export default async function DashBoard() {

    const cookieStore = await cookies();

    const authCookie = cookieStore.get('admin-auth-cookie')

    const user = await admin.auth();
    if (!authCookie) {
        redirect('/')
    } else {
        try {
            const userDetails = await user.verifySessionCookie(authCookie.value)
            
            if (userDetails.uid !== process.env.AUTHORIZED_UID) {
                return <h1>Forbidden resourse</h1>
                // redirect('/')
            }
        } catch (err) {
            console.log("Invalid credentials or session", err)
            return <h1>Invalid credentials or session</h1>
            // redirect('/')
        }
    }


    const { docs: menus } = await admin.firestore().collection("menu").get();

    // const arr = menusSnapshot.docs
    const menuList = menus.map(doc => ({id: doc.id, ...doc.data() as {name: string, path: string, position: number}}))


    return <>
        <h1>Dashboard</h1>
        {menuList.map(menu => <h3 key={menu.id}><Link href={`/dashboard/menu${menu.path}`}>{menu?.name}</Link></h3>)}
    </>
}