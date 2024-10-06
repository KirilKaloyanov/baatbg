"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify  from 'dompurify'


export default function Page() {
  const [content, setContent] = useState("");

  const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        async function fetchApiKey() {
            const response = await fetch('/api/tinymce');
            if (response.ok) {
              console.log('yess')
              const data = await response.json();
              setApiKey(data.apiKey);
            } else {
              console.log('no')
            }
            
        }

        fetchApiKey();
    }, []);

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

if (!apiKey) return <h1>Loading</h1>
if (apiKey)
  return <>
    <h1>Editor</h1>
    <form onSubmit={handleSubmit}>
    <Editor
      apiKey={apiKey} 
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Oct 20, 2024:
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue="Welcome to TinyMCE!"
    />

      <button type='submit'>Submit</button>
    </form>
  </>
}