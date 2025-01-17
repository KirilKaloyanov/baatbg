"use client";

import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useActionState,
} from "react";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { postListDto } from "@interfaces/postData";
import { editPost } from "@actions/form-actions";
import { useFormStatus } from "react-dom";
import { useMutation } from "@tanstack/react-query";

interface richEditorProps {
  item: postListDto;
  apiKey: string;
  resetForm: () => void;
  queryClient: any;
  fetchPosts: any
}

export default function PostForm({ item, apiKey, resetForm, queryClient, fetchPosts }: richEditorProps) {
  const [formValues, setFormValues] = useState(item);
  const editorRef = useRef<any>(null);
  const menuPathRef = useRef<any>(null);
  const subMenuPathRef = useRef<any>(null);

  const TinyMCEditor = dynamic(
    () => import("src/app/dashboard/posts/richEditor")
  );

  // const [formState, formAction] = useActionState(editPost, {});

  const { pending } = useFormStatus();
  
  useEffect(() => {
    setFormValues(item);
  }, [item]);
  
  const mutation = useMutation({
    mutationFn:editPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
      resetForm();

    }

  })  

  async function logContent() {
    // const formData = new FormData();
    // formData.append("id", item.id);
    // formData.append("menuPath", menuPathRef.current.value);
    // formData.append("subMenuPath", subMenuPathRef.current.value);
    // formData.append(
    //   "content",
    //   apiKey
    //     ? DOMPurify.sanitize(editorRef.current.getContent())
    //     : editorRef.current.value
    // );

    // await formAction(formData);
    mutation.mutate({
      id:item.id,
      menuPath: menuPathRef.current.value,
      subMenuPath: subMenuPathRef.current.value,
      content: apiKey
        ? DOMPurify.sanitize(editorRef.current.getContent())
        : editorRef.current.value
    })
  }

  return (
    <>
      {/* {formState.message} */}
      <div style={{zIndex: 1, position: "absolute", backgroundColor: "lightgrey", top: 0, width: '99vw', height: "99vh"}}>
        <form action={logContent}>
          <div>
            <input id="id" name="id" type="hidden" value={formValues.id} />

            <label htmlFor="menuPath">Menu Path</label>
            <input
              type="text"
              defaultValue={formValues.menuPath}
              ref={menuPathRef}
            ></input>
            <label htmlFor="subMenuPath">Submenu Path</label>
            <input
              type="text"
              defaultValue={formValues.subMenuPath}
              ref={subMenuPathRef}
            ></input>
            <input type="submit" value="Save" disabled={pending} />
            <button onClick={resetForm}>Cancel</button>
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
              <TinyMCEditor
                apiKey={apiKey}
                item={formValues.content}
                editorRef={editorRef}
              />
            </Suspense>
          ) : (
            <textarea
              id="content"
              ref={editorRef}
              defaultValue={formValues.content}
              style={{ height: "400px", width: "98vw" }}
            />
          )}
        </form>
      </div>
    </>
  );
}
