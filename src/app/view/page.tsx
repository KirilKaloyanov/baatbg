"use client";
"/view"

import { useState, useEffect } from "react";
import Link from "next/link";
import Form from "@components/forms/form";
import { getCollection } from "../../services/firestoreService";

interface fbPost {
  id: string;
  content: string;
}

export default function ViewContent() {
  const [posts, setPosts] = useState<fbPost[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getCollection("posts");
      setPosts(data);
    };
    getData();
  }, []);

  if (posts == null) return <h1>Loading</h1>

  async function handleDelete(id: string) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      console.log('/api/posts DELETE success')
    }
  }

  return (
    <div>
      <h1>Published Content</h1>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <Link href={`/view/${item.id}`}>{item.id}</Link>
            <button onClick={() => handleDelete(item.id)} >Delete</button>
          </li>
        ))}
      </ul>
      {/* <div dangerouslySetInnerHTML={{ __html: content[0]?.content.toString() || "No content yet" }} /> */}
      {/* { content?.ytLink &&
      <div style={{maxWidth: '650px'}}> 
        <div style={{left: 0, width: "100%", height: 0, position: "relative", paddingBottom: "56.25%"}}>
          <iframe style={{top: 0, left: 0, width: "100%", height:" 100%", position: "absolute", border: 0}} 
          src={content?.ytLink} 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;">
          </iframe>
        </div>
      </div>
      } */}
      
      <h1>Firestore</h1>
      <Form />
    </div>
  );
}
