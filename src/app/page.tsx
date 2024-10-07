

"use client";

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify  from 'dompurify'


export default function Page() {
  const editorRef = useRef<any>(null);

  const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        async function fetchApiKey() {
            const response = await fetch('/api/tinymce');
            if (response.ok) {
              const data = await response.json();
             setApiKey(data.apiKey)
            } else {
              console.log('/page.tsx failed to fetch from /api/tinymce')
            }
        }

        fetchApiKey();
    }, []);
  
  const saveContent = async (content) => {
    if (content) {
      const response = await fetch('/api/publish', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content})
      });

      if (response.ok) {
        alert("Content submitted");
      } else {
        alert("Failed to submit");
      }
    }
  }

  
  const logContent = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e)

    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      console.log(editorContent);
      const sanitizedContent = DOMPurify.sanitize(editorContent);
      await saveContent(sanitizedContent);

    }
  }

if (!apiKey) return <h1>Loading</h1>
if (apiKey)
  return <>
    <h1>Editor</h1>
    <form>
    <Editor
      apiKey={apiKey} 
      onInit={(evt, editor) => (editorRef.current = editor)}
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
      initialValue=""
    />
<input></input>
      <button onClick={logContent}>Submit</button>
    </form>
  </>
}