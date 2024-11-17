"use client";

import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useMemo,
  useActionState,
} from "react";
import DOMPurify, { sanitize } from "dompurify";
import dynamic from "next/dynamic";
import { postListDto } from "@interfaces/postData";
import { editPost } from "@actions/form-actions";
import { useFormStatus } from "react-dom";

interface richEditorProps {
  item: postListDto;
  apiKey: string;
  resetForm: () => void;
}

export default function PostForm({ item, apiKey, resetForm }: richEditorProps) {
  const [formValues, setFormValues] = useState(item);
  const editorRef = useRef<any>(null);

  const TinyMCEditor = dynamic(
    () => import("src/app/dashboard/posts/richEditor")
  );

  const memoizedEditor = useMemo(() => {
    return <TinyMCEditor
              apiKey={apiKey}
              item={formValues.content}
              editorRef={editorRef}
            />
  }, [formValues.content])

  const [formState, formAction] = useActionState(editPost, {});

  const { pending } = useFormStatus();


  useEffect(() => {
    setFormValues(item);
  }, [item]);

  function changeValue(e) {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function logContent() {
    const formData = new FormData();
    formData.append("id", formValues.id);
    formData.append("menuPath", formValues.menuPath);
    formData.append("subMenuPath", formValues.subMenuPath);
    formData.append(
      "content",
      DOMPurify.sanitize(editorRef.current.getContent())
    );

    await formAction(formData);
    resetForm();
  }

  return (
    <>
      {formState.message}
      <form action={logContent}>
        <div>
          <input id="id" name="id" type="hidden" value={formValues.id} />

          <label htmlFor="menuPath">Menu Path</label>
          <input
            type="text"
            id="menuPath"
            name="menuPath"
            value={formValues.menuPath}
            onChange={changeValue}
          ></input>
          <label htmlFor="subMenuPath">Submenu Path</label>
          <input
            type="text"
            id="subMenuPath"
            name="subMenuPath"
            value={formValues.subMenuPath}
            onChange={changeValue}
          ></input>
          <input type="submit" value="Save" disabled={pending} />
        </div>
        {apiKey ? (
          <Suspense
            fallback={
              <textarea
                style={{ height: "400px", width: "98vw" }}
                defaultValue={item.content}
              />
            }
          >
            {memoizedEditor}
          </Suspense>
        ) : (
          <textarea
            id="content"
            name="content"
            style={{ height: "400px", width: "98vw" }}
            value={formValues.content}
            onChange={changeValue}
          />
        )}
      </form>
    </>
  );
}
