// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log('hendler')
//     const response = await fetch('https://us-central1-baatbgorg.cloudfunctions.net/tinymceApiKey'); // Replace with your function URL
//     // const data = await response.json();
//     console.log(response)

//     // res.status(200).json(data);
// }
// pages/api/tinymce.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (process.env.NODE_ENV == 'production') {
        try {
          const response = await fetch("https://tinymceapikey-jme7y3mjja-uc.a.run.app"); 
          // Your deployed Firebase function URL

          const data = await response.json();

        res.status(200).json({ data });
        } catch (error) {
            console.error("Error fetching TinyMCE API Key:", error);
            res.status(500).json({ error: "Failed to fetch TinyMCE API Key" });
        }
    } else if (process.env.NODE_ENV == 'development') {
        const localApiKey = process.env.LOCAL_TINYMCE_API_URL

        if (!localApiKey) {
            console.error("LOCAL_TINYMCE_API_URL is not set in development environment.");
            return res.status(500).json({ error: "LOCAL_TINYMCE_API_URL is not configured" });
        }
        return res.status(200).json({ apiKey: localApiKey });
    } else res.status(500).json({ error: "Unknown environment"});

}
