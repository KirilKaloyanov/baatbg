import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "@firebaseAdminConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorisation = req.headers.authorization;
  if (!authorisation || !authorisation.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorisation.split(" ")[1];
  let isTokenValid = false;

  try {
    const user = await admin.auth().verifyIdToken(token);
        // console.log(user);
    const authorizedUid = process.env.AUTHORIZED_UID;
    if (user.uid == authorizedUid) isTokenValid = true;
  } catch (err) {
    console.log("error from auth in tiny api route", err);
  }

  if (req.method == "GET" && isTokenValid) {
    let apiKey = process.env.TINYMCE_API_URL;
    if (apiKey) res.status(200).json(apiKey);
  } else res.status(403).json({ message: "Forbidden" });
}


    // if (!apiKey) {
    //     try {
    //         const response = await fetch(
    //             "https://tinymceapikey-jme7y3mjja-uc.a.run.app"
    //         );
    //         const data = await response.json();
    //         apiKey = data.apiKey;
    //     } catch (error) {
    //         console.error("Error fetching TinyMCE API Key:", error);
    //     }
    // }