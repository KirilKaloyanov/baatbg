import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        console.log(req.headers.authorization)
        let apiKey = process.env.LOCAL_TINYMCE_API_URL;
        if (apiKey) console.log("Local api key tiny", apiKey);
        
        if (!apiKey) {
            try {
                const response = await fetch(
                    "https://tinymceapikey-jme7y3mjja-uc.a.run.app"
                );
                const data = await response.json();
                apiKey = data.apiKey;
            } catch (error) {
                console.error("Error fetching TinyMCE API Key:", error);
            }
        }

        if (apiKey) res.status(200).json(apiKey);
        else res.status(400).end;
    }
} 