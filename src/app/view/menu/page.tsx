"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from 'next/link'
import EditMenuController from "./[menuId]/page";
import EditMenuItem from "@components/forms/editMenuItem";

export default function AdminMenu() {
    const [mainMenus, setMainMenus] = useState<any>(null);
    const emptyMenu = {
        id: "",
        name: '',
        position: 0,
        path: ""
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/view/menu/api");
                const data = await res.json();
                setMainMenus(data);
            } catch (err) {
                console.error("error", err);
            }
        };
        fetchData();
    }, []);

    if (!mainMenus) return <h1>Loading...</h1>;

    return (
        <>
            <p>Menu Admin</p>
            {mainMenus.map(menu => (
                <div key={menu.id}>
                    <p>{menu.data.name}</p>
                    <Link href={`/view/menu/${menu.id}`}>Edit</Link>
                </div>
                ))}

            <EditMenuItem initialData={emptyMenu} />
        </>
    );
}

// function Input( {
//     props
// } : {
//     props: {
//         name: string,
//         position: number
//     }
// } ) {
//     return (<>
//         <label htmlFor="menuName">Input</label>
//         <input
//             name="menuName"
//             id="menuName"
//             value={props.name}
//             type="text" />
//     </>)
// }



{/* <label htmlFor={id}>Input</label>
                    <input
                        name="menuName"
                        id={id}
                        value={data.name}
                        onChange={(e) => handleInputChange(e, id)}
                        type="text"
                    /> */}