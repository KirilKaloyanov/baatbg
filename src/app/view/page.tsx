'use client';

import { useEffect, useState } from "react";

export default function ViewContent() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      const response = await fetch("/api/publish");
      const data = await response.json();
      setContent(data.content);
    }

    fetchContent();
  }, []);

  return (
    <div>
      <h1>Published Content</h1>
      <div dangerouslySetInnerHTML={{ __html: content || "No content yet" }} />
      
      <div style={{maxWidth: '650px'}} data-ephox-embed-iri="https://youtu.be/MQc6ws2LmW8?si=D70nCMlSkcttejCo">
        <div style={{left: 0, width: "100%", height: 0, position: "relative", paddingBottom: "56.25%"}}>
          <iframe style={{top: 0, left: 0, width: "100%", height:" 100%", position: "absolute", border: 0}} 
          src="https://www.youtube.com/embed/MQc6ws2LmW8?rel=0" 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;">
          </iframe>
        </div>
      </div>
    </div>
  );
}
