"use client";

import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Editor } from "@tinymce/tinymce-react";
import { collection, DocumentData, addDoc } from "firebase/firestore";
import {
  getContentById,
  saveNewContent,
  updateContent,
} from "@services/firestoreService";

interface richEditorProps {
  apiKey: string;
  itemId?: string;
}

export default function RichEditor({ apiKey, itemId }: richEditorProps) {
  const [existingContent, setExistingContent] = useState<DocumentData | null>(
    null
  );
  const editorRef = useRef<any>(null);
  const videoRef = useRef<any>(null);

  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    setIsEditor(true);

    if (itemId) {
      const fetchData = async () => {
        const data = await getContentById(itemId);
        if (data) setExistingContent(data);
        // console.log(data.content)
      };
      fetchData();
    }
  }, [itemId]);

  const saveContent = async (content) => {
    if (itemId) {
      await updateContent(itemId, content);
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

        {isEditor ? (
          <Editor
            apiKey={apiKey}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              plugins: [
                // Core editing features
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Oct 20, 2024:
                "checklist",
                "mediaembed",
                "casechange",
                "export",
                "formatpainter",
                "pageembed",
                "a11ychecker",
                "tinymcespellchecker",
                "permanentpen",
                "powerpaste",
                "advtable",
                "advcode",
                "editimage",
                "advtemplate",
                // "ai",
                // "mentions",
                // "tinycomments",
                "tableofcontents",
                "footnotes",
                // "mergetags",
                "autocorrect",
                // "typography",
                // "inlinecss",
                // "markdown",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              // ai_request: (request, respondWith) =>
              //   respondWith.string(() =>
              //     Promise.reject("See docs to implement AI Assistant")
              //   ),
            }}
            initialValue={existingContent ? existingContent.content : ""}
          />
        ) : (
          <textarea
            style={{ height: `400px`, width: "98vw" }}
            readOnly
            defaultValue={"Loading editor..."}
          />
        )}
      </form>
    </>
  );
}
