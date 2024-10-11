import dynamic from "next/dynamic";

export default async function Page() {
  const TinyMCEditor = dynamic(() => import("../components/richEditor"), {
    ssr: false,
  });

  let apiKey = process.env.LOCAL_TINYMCE_API_URL;
  console.log("Local api key tiny", apiKey);
  
  if (!apiKey) {
    try {
      const response = await fetch(
        "https://tinymceapikey-jme7y3mjja-uc.a.run.app"
      );
      const data = await response.json();
      apiKey = data.apiKey;
      console.log("FB api key tiny", apiKey);
    } catch (error) {
      console.error("Error fetching TinyMCE API Key:", error);
    }
  }

  if (!apiKey) return <h1> Waiting for editor key</h1>;
  if (apiKey)
    return (
      <>
        <h1>Editor</h1>
        <TinyMCEditor apiKey={apiKey} />
      </>
    );
}
