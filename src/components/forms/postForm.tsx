"use client";

import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import {
  getContentById,
  saveNewContent,
  updateContent,
} from "@services/firestoreService";

interface richEditorProps {
  apiKey: string;
  item?: { itemId: string; data: { content: string } };
}

export default function PostForm({ apiKey, item }: richEditorProps) {
  const editorRef = useRef<any>(null);
  const videoRef = useRef<any>(null);

  const TinyMCEditor = dynamic(() => import("@components/richEditor"), {
    ssr: false,
  });

  const saveContent = async (content) => {
    if (item) {
      await updateContent(item.itemId, content);
    } else {
      await saveNewContent(content);
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
  return (
    <>
      <form onSubmit={logContent}>
        <div>
          <label htmlFor="ytinput">YouTube link</label>
          <input type="text" id="ytinput" ref={videoRef}></input>
          <input type="submit" value="Save" />
        </div>

        <TinyMCEditor apiKey={apiKey} item={item} editorRef={editorRef}/>
      </form>
    </>
  );
}
