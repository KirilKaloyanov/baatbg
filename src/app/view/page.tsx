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
    </div>
  );
}
