import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@firebaseConfig"

import { PostDTO, PostMetaDTO } from "@/interfaces/admin/PostsDTO";

  export async function getAllPostsMetaData() {
    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        return data as PostMetaDTO[];
      } catch (error) {
        console.log("Error fetching from Firestore/ inside firebaseOps", error)
      }
      return null;
  }

  export async function getPostMetaDataByPostId(id: string) {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as PostMetaDTO;
      } else {
        console.log('No such document (getPostMetaDataByPostId)');
      }
    } catch (e) {
      console.log("Error fetching from Firestore/ inside firebaseOps", e);
    }
    return null;
  }

  export async function getPostBySubMenuId(id: string) {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("subMenuPath", "==", id))
      const snapShot = await getDocs(q);
      let data: any = null;
      snapShot.forEach((res) => {
        data = res.data();
      })
      return data as PostDTO;
    } catch (err) {
      console.error(err)
    }
    return null;
  }

  export async function getAllPostsByMenuId(id: string ) {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("menuPath", "==", id))
      const snapShot = await getDocs(q);
      let data = snapShot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      return data;
    } catch (err) {
      console.error(err)
    }
  }

