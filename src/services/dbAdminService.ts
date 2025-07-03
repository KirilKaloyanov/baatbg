// import { db } from "@firebaseServer"


// export async function getCollection(collectionName: string) {
//     return await db.collection(collectionName).get();

// }

// export async function getDocument(collectionName:string, documentId:string) {
//     return await db.collection(collectionName).doc(documentId).get();

// }

// export async function getDocumentByFieldValue(collectionName: string, fieldName: string, value: string){
//     return await db
//         .collection(collectionName)
//         .where(fieldName, '==', value)
//         .get();
// }