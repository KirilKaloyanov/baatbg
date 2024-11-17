'use client';

import { postListDto } from "@interfaces/postData"

import { useState } from "react";

import PostForm from "@components/forms/postForm";

export default function EditPosts({ postList, apiKey } : { postList: postListDto[], apiKey: string } ) {
    const initialFormValues = { id: "create", content: "", menuPath: "", subMenuPath: ""};

    const [ postForEditing, setPostForEditing ] = useState<postListDto>(initialFormValues);

    return (
        <>
        <ul> 
            {/* filter by mainMenuPath */}
            {postList.map(post => <li key={post.id} onClick={() => setPostForEditing(post)}>{post.id}</li>)}
        </ul>
        <PostForm item={postForEditing} apiKey={apiKey} />
        </>
    )
}