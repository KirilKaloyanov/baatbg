import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from '@firebaseClient';

export async function getCollection(collectionName: string) {
    const ref = collection(db, collectionName)
    return await getDocs(ref);
}

export async function getDocument(collectionName:string, documentId:string) {
    const ref = doc(db, collectionName, documentId)
    return await getDoc(ref); 
}

export async function getDocumentByFieldValue(collectionName: string, fieldName: string, value: string){
    const ref = collection(db, collectionName);
    const q = query(ref, where(fieldName, "==", value));
    return await getDocs(q);
}