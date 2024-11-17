"use client";

import { postListDto } from "@interfaces/postData"
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";


interface richEditorProps {
  apiKey: string;
  item: string;
  editorRef: any
}

export default function RichEditor({ apiKey, item, editorRef }: richEditorProps) {
  
  const [content, setContent ] = useState<string | null>(null)

  useEffect(() => {
    setContent(item)
  }, [])
  
  function changeContent(newContent: string) {
    setContent(newContent);
  }

  return (
        
          <Editor
            apiKey={apiKey}
            onInit={(evt, editor) => ( editorRef.current = editor )} // HERE TODO 
            init={{
              plugins: [
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
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
            }}
            initialValue={content || ""}
            onEditorChange={changeContent}
          />
        
  );
}
