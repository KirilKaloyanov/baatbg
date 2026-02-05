import { getCollection, getDocument, getDocumentByFieldValue } from "@/services/dbService";
import { PostDTO, PostMetaDTO } from "@/interfaces/PostsDTO";
import { mapFirestoreDocs } from "@/utils/firestoreUtils";
import { COLLECTIONS } from "@/constants/collections";

export async function getAllPostsMetaData(): Promise<PostMetaDTO[] | null> {
  try {
    const querySnapshot = await getCollection(COLLECTIONS.POSTS);
    return mapFirestoreDocs<PostMetaDTO>(querySnapshot.docs);
  } catch (error) {
    console.error("[PostsService] Error fetching all posts metadata:", error);
    throw error;
  }
}

export async function getPostMetaDataByPostId(id: string): Promise<PostMetaDTO | null> {
  try {
    const docSnap = await getDocument(COLLECTIONS.POSTS, id);
    if (docSnap.exists()) {
      return docSnap.data() as PostMetaDTO;
    }
    console.warn("[PostsService] Post metadata not found:", id);
    return null;
  } catch (error) {
    console.error("[PostsService] Error fetching post metadata by ID:", error);
    throw error;
  }
}

export async function getPostBySubMenuId(id: string): Promise<PostDTO | null> {
  try {
    const querySnapshot = await getDocumentByFieldValue(COLLECTIONS.POSTS, "subMenuPath", id);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as PostDTO;
    }
    console.warn("[PostsService] Post not found for submenu ID:", id);
    return null;
  } catch (error) {
    console.error("[PostsService] Error fetching post by submenu ID:", error);
    throw error;
  }
}

export async function getAllPostsByMenuId(id: string): Promise<PostDTO[] | null> {
  try {
    const querySnapshot = await getDocumentByFieldValue(COLLECTIONS.POSTS, "menuPath", id);
    return mapFirestoreDocs<PostDTO>(querySnapshot.docs);
  } catch (error) {
    console.error("[PostsService] Error fetching all posts by menu ID:", error);
    throw error;
  }
}

