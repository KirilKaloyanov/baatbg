"use client";

import { useActionState, useEffect, useState } from "react";
import { editMenu } from "@actions/form-actions"

export default function EditMenuForm({ menu } : { 
    menu: {id: string, name: string, position: number, path: string}
}) {

    const [ formValues, setFormValues ] = useState(menu);
    const [ formState, formAction ] = useActionState(editMenu, {});

    useEffect(() => {
        setFormValues(prevMenu => menu)
    }, [menu])


    function changeValue(e) {
        setFormValues(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.id === "position" ? parseInt(e.target.value) : e.target.value
            }
        })
    }
    return (
        <>
        <h2>List menus</h2>
        <form id="edit-menu-form" action={formAction}>
            <input id="id" name="id" type="hidden" value={formValues.id} />
            <p>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formValues.name} onChange={changeValue}/>
            </p>
            <p>
                <label htmlFor="position">Position</label>
                <input id="position" name="position" type="text" value={formValues.position} onChange={changeValue}/>
            </p>
            <p>
                <label htmlFor="path">Path</label>
                <input id="path" name="path" type="text" value={formValues.path} onChange={changeValue}/>
            </p>
            <button type="submit">{formValues.id !== "create" ? "Update" : "Create"}</button>
        </form>
        </>
    )
}