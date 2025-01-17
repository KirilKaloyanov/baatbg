"use client";

import { useState } from "react";

import { postListDto } from "@interfaces/postData";
import PostForm from "./postForm";
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function EditPosts({ apiKey }: { apiKey: string }) {
  const initialFormValues = {
    id: "create",
    content: "",
    menuPath: "",
    subMenuPath: "",
  };

  const fetchPosts = async () => {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "posts"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as {
        content: string;
        menuPath: string;
        subMenuPath: string;
      }),
    }));
  };

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [postForEditing, setPostForEditing] = useState<postListDto | null>(    null  );
  const [filteredPosts, setFilteredPosts] = useState<postListDto[] | []>(    []  );

  function filterPosts(menuPath: string) {
    if (data) {
      if (menuPath === "all") {
          setFilteredPosts(data)
      } else {
        const filtered = data.filter((post) => post.menuPath === menuPath)
          setFilteredPosts(filtered);
      }
    }
  }

  let categories = ["all"];
  if (data) {
    categories = categories.concat(
      ...new Set(data.map((post) => post.menuPath))
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error</h1>
  }

  if (filteredPosts.length === 0 && data) {
    setFilteredPosts(data);
  }

    return (
      <>
        {categories.map((menuPath) => (
          <button key={menuPath} onClick={() => filterPosts(menuPath)}>
            {menuPath}
          </button>
        ))}
        <ul>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <li key={post.id} onClick={() => setPostForEditing(post)}>
                /{post.menuPath}/{post.subMenuPath}
              </li>
            ))}
          <li onClick={() => setPostForEditing(initialFormValues)}>
            Create new post
          </li>
        </ul>
        {postForEditing && (
          <PostForm
            item={postForEditing}
            apiKey={apiKey}
            resetForm={() => setPostForEditing(null)}
            queryClient={queryClient}
            fetchPosts={fetchPosts}
          />
        )}
      </>
    );
}
