"client service GET functions"

import { doc, getDoc, collection, collectionGroup, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebaseConfig"


export async function getContentById(collection: string, itemId: string) {
    try {

        const docRef = doc(db, collection, itemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log("No such document")
        }
    } catch(e) {
        console.log("Error fetching from Firestore/ inside firebaseOps", e);
    }
  }


  export async function getCollection(name: string) {
    try {
        const querySnapshot = await getDocs(collection(db, name));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content
        }))
        return data;
      } catch (error) {
        console.log("Error fetching from Firestore/ inside firebaseOps", error)
      }
      return null;
  }

  export async function getPostBySubMenuId(id: string) {
    try {
      // const queryParams = query(collectionGroup(db, 'submenu'), where("subMenuId", "==", "jMvhILD2l3RWIY04sLeL"));
      // const querySnapshot = await getDocs(queryParams);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data())
      // })
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("subMenuId", "==", id))
      const snapShot = await getDocs(q);
      let data;
      snapShot.forEach((res) => {
        data = res.data();
      })
      // console.log(data)
      return data;
    } catch (err) {
      console.error(err)
    }
  }

  export async function getPostsByMenuId(id: string ) {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("menuId", "==", id))
      const snapShot = await getDocs(q);
      let data = snapShot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      // console.log(data)
      return data;
    } catch (err) {
      console.error(err)
    }
  }

  export async function getMenuItems(name: string) {
    try {
        const querySnapshot = await getDocs(collection(db, name));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
        return data;
      } catch (error) {
        console.log("Error fetching from Firestore/ inside firebaseOps", error)
      }
      return null;
  }