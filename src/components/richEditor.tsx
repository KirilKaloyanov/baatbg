"use client";

import React, { useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Editor } from "@tinymce/tinymce-react";
import {
  saveNewContent,
  updateContent,
} from "@services/firestoreService";

interface richEditorProps {
  apiKey: string;
  editorRef: any,
  item?: { itemId: string; data: { content: string } };
}

export default function RichEditor({ apiKey, editorRef, item }: richEditorProps) {

  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    setIsEditor(true);
  }, []);

  return (
        isEditor ? (
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
            initialValue={item ? item.data.content : ""}
          />
        ) : (
          <textarea
            style={{ height: "400px", width: "98vw" }}
            readOnly
            defaultValue={"Loading editor..."}
          />
        )
  );
}
