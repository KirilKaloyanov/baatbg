import { getCollection, getDocument, getDocumentByFieldValue } from '@services/dbService';

import { PostDTO, PostMetaDTO } from "@/interfaces/PostsDTO";

  export async function getAllPostsMetaData() {
    try {
        const querySnapshot = await getCollection('posts');
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        return data as PostMetaDTO[];
        
      } catch (error) {
        console.log("Error fetching from Firestore/ inside getAllPostsMetaData", error)
      }

      return null;
  }

  export async function getPostMetaDataByPostId(id: string) {
    try {
      const docSnap = await getDocument('posts', id);

      if (docSnap.exists()) {
        return docSnap.data() as PostMetaDTO;
      } else {
        console.log('No such document (getPostMetaDataByPostId)');
      }

    } catch (e) {
      console.log("Error fetching from Firestore/ inside getPostMetaDataByPostId", e);
    }

    return null;
  }

  export async function getPostBySubMenuId(id: string) {
    try {
      const querySnapshot = await getDocumentByFieldValue('posts', 'subMenuPath', id) 
      let data: any = null;

      querySnapshot.forEach((res) => {
        data = res.data();
      })

      return data as PostDTO;

    } catch (err) {
      console.error("Error fetching from Firestore/ inside getPostBySubMenuId", err)
    }
    return null;
  }

  export async function getAllPostsByMenuId(id: string ) {
    try {
      const querySnapshot = await getDocumentByFieldValue('posts', 'menuPath', id); 
        
      let data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))

      return data;

    } catch (err) {
      console.error("Error fetching from Firestore/ inside getAllPostsByMenuId", err)
    }
  }

