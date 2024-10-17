import dynamic from "next/dynamic";

export default async function EditPost( { params }: {params: {postId: string}}) {
  const TinyMCEditor = dynamic(() => import("../../../../components/richEditor"), {
    ssr: false,
  });

  const { postId } = params;

  let apiKey = process.env.LOCAL_TINYMCE_API_URL;
  console.log("Local api key tiny", apiKey);
  
  if (!apiKey) {
    try {
      const response = await fetch(
        "https://tinymceapikey-jme7y3mjja-uc.a.run.app"
      );
      const data = await response.json();
      apiKey = data.apiKey;
      console.log("remote FB api key tiny", apiKey);
    } catch (error) {
      console.error("Error fetching TinyMCE API Key:", error);
    }
  }

    if (apiKey) return <TinyMCEditor apiKey={apiKey} itemId={postId}/>
    return <h1> Waiting for editor key</h1>

}
