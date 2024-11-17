import { admin } from "@firebaseAdminConfig"
import { MenuDTO } from "@interfaces/admin/MenuDTO";
import Link from "next/link";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";
import EditMenus from "./editMenus";

export default async function EditMenuCollection() {

    const { docs: menus } = await admin.firestore().collection("menu").get();

    // const arr = menusSnapshot.docs
    const menuList = menus.map(doc => ({id: doc.id, ...doc.data() as {name: string, path: string, position: number}}))


    return <>
        <EditMenus menuList={menuList} />
        
    </>
}