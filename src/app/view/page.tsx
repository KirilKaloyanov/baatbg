'use client';

import { useEffect, useState } from "react";


export default function ViewContent() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const response = await fetch("/api/publish");
      const data = await response.json();
      setContent(data.content);
    }

    fetchContent();
  }, []);
  console.log(content?.ytLink)

  return (
    <div>
      <h1>Published Content</h1>
      <div dangerouslySetInnerHTML={{ __html: content?.sanitizedContent || "No content yet" }} />
      { content?.ytLink &&
      <div style={{maxWidth: '650px'}}> 
        <div style={{left: 0, width: "100%", height: 0, position: "relative", paddingBottom: "56.25%"}}>
          <iframe style={{top: 0, left: 0, width: "100%", height:" 100%", position: "absolute", border: 0}} 
          src={content?.ytLink} 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;">
          </iframe>
        </div>
      </div>
      }
    </div>
  );
}
