import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@firebaseServer"

import { PostDTO, PostMetaDTO } from "@/interfaces/admin/PostsDTO";
import { snapshot } from "node:test";

  export async function getAllPostsMetaData() {
    try {
        // const querySnapshot = await getDocs(collection(db, "posts"));
        const querySnapshot = await db.collection('posts').get();
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
      // const docRef = doc(db, 'posts', id);
      const docRef = db.collection('posts').doc(id);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
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

      const querySnapshot = await db
        .collection('posts')
        .where('subMenuPath', '==', id)
        .get();

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

      const querySnapshot = await db
        .collection('posts')
        .where('menuPath', '==', id)
        .get();
        
        
      let data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))

      return data;

    } catch (err) {
      console.error("Error fetching from Firestore/ inside getAllPostsByMenuId", err)
    }
  }

