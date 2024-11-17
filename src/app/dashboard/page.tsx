import Link from "next/link";

export default async function DashBoard() {
    return ( 
    <>    
    <Link href={"/dashboard/menu"}>Edit Menus</Link>    
    <Link href={"/dashboard/posts"}>Edit Posts</Link>    
    </>
    )
}