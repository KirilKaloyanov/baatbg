"use client"

import Link from "next/link"
import { useAuth } from "@context/AuthContext"

export default function Menu( {items} ) {
    const user = useAuth();
    if (!items) return <div> no menu </div>
    return (
        <nav>
            {items.map(item => (
                <Link key={item.id} href={"/" + item.data.path}>
                    {item.data.name}
                </Link>
            ))}
            { user && <Link href={"/dashboard"}>Dashboard</Link> }
        </nav>
        )

}