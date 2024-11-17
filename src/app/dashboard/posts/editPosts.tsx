"use client";

import { postListDto } from "@interfaces/postData";

import { useEffect, useState } from "react";

import PostForm from "./postForm";

export default function EditPosts({
  postList,
  apiKey,
}: {
  postList: postListDto[];
  apiKey: string;
}) {
  const initialFormValues = {
    id: "create",
    content: "",
    menuPath: "",
    subMenuPath: "",
  };

  const [postForEditing, setPostForEditing] =
    useState<postListDto | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<postListDto[]>(postList);

  function filterPosts(menuPath: string) {
    menuPath === "all"
      ? setFilteredPosts(postList)
      : setFilteredPosts(postList.filter((post) => post.menuPath === menuPath));
  }

  const categories = [...new Set(postList.map((post) => post.menuPath))];
  categories.push("all");

  return (
    <>
      {categories.map((menuPath) => (
        <button key={menuPath} onClick={() => filterPosts(menuPath)}>
          {menuPath}
        </button>
      ))}
      <ul>
        
        {
        filteredPosts.map((post) => (
          <li key={post.id} onClick={() => setPostForEditing(post)}>
            /{post.menuPath}/{post.subMenuPath}
          </li>
        ))
        }
        <li onClick={() => setPostForEditing(initialFormValues)}>
          Create new post
        </li>
      </ul>
      {
      postForEditing && <PostForm item={postForEditing} apiKey={apiKey} resetForm={() => setPostForEditing(null)}/>
      }
    </>
  );
}
