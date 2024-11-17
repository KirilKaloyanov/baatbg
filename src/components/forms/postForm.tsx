"use client";

import React, { useRef, Suspense } from "react";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { postListDto } from "@interfaces/postData"
import { editPost } from "@actions/form-actions";

interface richEditorProps {
  item: postListDto;
  apiKey: string
}

export default function PostForm({ item, apiKey }: richEditorProps) {
  const editorRef = useRef<any>(null);
  const menuPathRef = useRef<any>(null);
  const subMenuPathRef = useRef<any>(null);

  const TinyMCEditor = dynamic(() => import("@components/forms/richEditor"));

  const logContent = async (e: React.FormEvent) => {
    e.preventDefault();

    let editorContent = '';

    if(apiKey) {
      editorContent = editorRef.current.getContent();
    } else {
      editorContent = editorRef.current.value;
    }

    const sanitizedContent = DOMPurify.sanitize(editorContent);
    const menuPath = menuPathRef.current.value;
    const subMenuPath = subMenuPathRef.current.value;
    const id = item.id

    const formData = new FormData();
    formData.append('content', sanitizedContent);
    formData.append('menuPath', menuPath);
    formData.append('subMenuPath', subMenuPath);
    formData.append('id', id);
    await editPost("", formData);
  };

    return (
      <>
        <form onSubmit={logContent}>
          <div>
            <label htmlFor="menuPath">Menu Path</label>
            <input type="text" id="menuPath" ref={menuPathRef} defaultValue={item.menuPath}></input>
            <label htmlFor="subMenuPath">Submenu Path</label>
            <input type="text" id="subMenuPath" ref={subMenuPathRef} defaultValue={item.subMenuPath}></input>
            <input type="submit" value="Save" />
          </div>
          { apiKey ? 
              <Suspense
                fallback={
                  <textarea
                  style={{ height: "400px", width: "98vw" }}
                  defaultValue={item.content}
                  />
                }
                >
                <TinyMCEditor
                  apiKey={apiKey}
                  item={item!}
                  editorRef={editorRef}
                  />
              </Suspense>
              :
              <textarea
                  style={{ height: "400px", width: "98vw" }}
                  defaultValue={item.content}
                  ref={editorRef}
              />
              }
        </form>
      </>
    );
  }

// const [content, setContent] = useState<string>("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setContent(e.target.value);
//     };

//     const handleClick = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const res = await fetch('api/posts', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ content })
//         });

//         if (res.ok) {
//             console.log("Posted");
//             setContent(""); // Clear input after successful submission
//         } else {
//             console.log('ne');
//         }
//     };
// return (
//         <>
//       <h1>Firestore</h1>

//         <form onSubmit={handleClick}>
//             <label htmlFor="input">field</label>
//             <input type="text" value={content} onChange={handleChange} id="input"/>
//             <input type="submit" value="Dong Dong" />
//         </form>
//         </>
//     );
// // if (!content) return <div>No content</div>
