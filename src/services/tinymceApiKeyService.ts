
export async function getTinyMceApiKey() {
    
    let apiKey = process.env.LOCAL_TINYMCE_API_URL;
    console.log("Local api key tiny", apiKey);
    
    if (!apiKey) {
        try {
            const response = await fetch(
                "https://tinymceapikey-jme7y3mjja-uc.a.run.app"
            );
            const data = await response.json();
            apiKey = data.apiKey;
            return apiKey;
        } catch (error) {
            console.error("Error fetching TinyMCE API Key:", error);
        }
    } else {
        return apiKey;
    }
}