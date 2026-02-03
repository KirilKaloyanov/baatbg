// Utility function to map Firestore documents to a typed array
export function mapFirestoreDocs<T>(docs: any[]): T[] {
  return docs.map(mapFireStoreSingleDoc<T>);
}

export function mapFireStoreSingleDoc<T>(doc: any): T {
  return {
    id: doc.id,
    ...doc.data(),
  } as T;
};