import { db } from "../../../firebaseConfig";
import { collection, DocumentData, getDocs } from "@firebase/firestore";


export default async function ViewContent() {
  let content: DocumentData[] = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        content = querySnapshot.docs.map((doc) => doc.data());
        console.log("data fetching from /view", content)
      } catch (error) {
        console.log("Error fetching from /view", error)
      }

  return (
    <div>
      <h1>Published Content</h1>
      <div dangerouslySetInnerHTML={{ __html: content[0]?.content.toString() || "No content yet" }} />
      {/* { content?.ytLink &&
      <div style={{maxWidth: '650px'}}> 
        <div style={{left: 0, width: "100%", height: 0, position: "relative", paddingBottom: "56.25%"}}>
          <iframe style={{top: 0, left: 0, width: "100%", height:" 100%", position: "absolute", border: 0}} 
          src={content?.ytLink} 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;">
          </iframe>
        </div>
      </div>
      } */}
    </div>
  );
}
