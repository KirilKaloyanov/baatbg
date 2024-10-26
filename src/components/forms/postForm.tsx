"use client";

import React, { useRef, useState, useEffect  } from "react";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { useAuth } from "@authContext";

interface richEditorProps {
  item?: { itemId: string; data: { content: string } };
}

export default function PostForm({ item }: richEditorProps) {
  const user = useAuth();
  const editorRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [ tinyApiKey, setTinyApiKey ] = useState<string | null>(null);
  const [ hasAuth, setHasAuth ] = useState<boolean>(false)

  useEffect(() => {
    const fetchKey = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await fetch("/api/tinyKey", {
            method: 'GET',
            headers: {
              "authorization": `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const key = await response.json();
            if (key) {
              setTinyApiKey(key);
              setHasAuth(true);
            }
          } else {
            setHasAuth(true);
            setTinyApiKey('invalid')
          }
        } catch (e) {
          console.log('key error', e)
        }
      } else return;
    }
    fetchKey();
  }, [user])
  

  const TinyMCEditor = dynamic(() => import("@components/forms/richEditor"), {
    ssr: false,
  });

  const saveContent = async (content) => {
    if (item?.itemId == "create") {
      try {
        const resp = await fetch('/api/posts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({content})
        })
        console.log('cuss', resp.ok)
      } catch (e) {
        console.log("Error fetching /api/posts", e)
      }
    } else if (item) {
      try {
        const resp = await fetch(`/api/posts/${item.itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(content)
        })
        console.log('cuss', resp.ok)
      } catch (e) {
        console.log("Error fetching /api/posts", e)
      }
    }
  };

  const logContent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      const ytLink = videoRef.current.value;
      console.log(editorContent, ytLink);
      const sanitizedContent = DOMPurify.sanitize(editorContent);
      await saveContent(sanitizedContent);
    }
  };
  if (!tinyApiKey) return <p>Loading key</p>
  if (!hasAuth) return <h1>Authentication is required</h1>
  if (tinyApiKey == "invalid") return <h1>Unauthorized</h1>
  if (tinyApiKey) return (
    <>
      <form onSubmit={logContent}>
        <div>
          <label htmlFor="ytinput">YouTube link</label>
          <input type="text" id="ytinput" ref={videoRef}></input>
          <input type="submit" value="Save" />
        </div>
        <TinyMCEditor apiKey={tinyApiKey} item={item!} editorRef={editorRef} />
      </form>
    </>
  );
  return <p>Loading...</p>
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
