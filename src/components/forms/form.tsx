'use client';
'used in /view page'

import { useState } from "react";

export default function Form() {
    const [content, setContent] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('api/posts', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        });

        if (res.ok) {
            console.log("Posted");
            setContent(""); // Clear input after successful submission
        } else {
            console.log('ne');
        }
    }; 

    return (
        <form onSubmit={handleClick}>
            <label htmlFor="input">field</label>
            <input type="text" value={content} onChange={handleChange} id="input"/>
            <input type="submit" value="Dong Dong" />
        </form>
    );
}