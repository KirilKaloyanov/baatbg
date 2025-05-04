import { doc, getDoc, collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { db } from "@firebaseConfig"

import { PostsDTO, PostsMetaDTO } from "@/interfaces/admin/PostsDTO";


// export async function getPostById( itemId: string) : Promise <PostData | undefined> {
//     try {
//         const docRef = doc(db, 'posts', itemId);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as DocumentData
//             return { content: data.content || ''}
//         } else {
//             console.log("No such document")
//         }
//     } catch(e) {
//         console.log("Error fetching from Firestore/ inside firebaseOps", e);
//     }
//   }

  export async function getAllPostsMetaData() {
    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        return data as PostsMetaDTO[];
      } catch (error) {
        console.log("Error fetching from Firestore/ inside firebaseOps", error)
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
      return data;
    } catch (err) {
      console.error(err)
    }
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

