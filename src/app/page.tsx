"use client";

import { useState } from 'react';
import DOMPurify  from 'dompurify'
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false})

export default function Page() {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedContent = DOMPurify.sanitize(content);

    const response = await fetch('/api/publish', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: sanitizedContent})
    });

    if (response.ok) {
      alert("Content submitted");
      setContent("");
    } else {
      alert("Failed to submit");
    }


  }


  return <>
    <h1>Editor</h1>
    <form onSubmit={handleSubmit}>
      <ReactQuill value={ content } onChange={ setContent } />
      <button type='submit'>Submit</button>
    </form>
  </>
}