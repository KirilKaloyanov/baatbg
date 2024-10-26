"use client"

import Link from "next/link"


export default function Menu( {items} ) {
    
    if (!items) return <div> no menu </div>
    console.log(items)
    return (
        <nav>
            {items.map(item => (
                <Link key={item.id} href={item.data.path}>
                    {item.data.name}
                </Link>
            ))}
        </nav>
        )

}