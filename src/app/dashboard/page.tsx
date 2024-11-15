import { admin } from "@firebaseAdminConfig"
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import Link from "next/link";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";

export default async function DashBoard() {

    const { docs: menus } = await admin.firestore().collection("menu").get();

    // const arr = menusSnapshot.docs
    const menuList = menus.map(doc => ({id: doc.id, ...doc.data() as {name: string, path: string, position: number}}))


    return <>
        <h2>List menus</h2>
        {menuList.map(menu => <h3 key={menu.id}><Link href={`/dashboard/menu${menu.path}`}>{menu?.name}</Link></h3>)}
    </>
}