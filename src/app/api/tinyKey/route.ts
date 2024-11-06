"/api/tinyKey"

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { admin } from "@firebaseAdminConfig";

export async function GET(
  req: Request,
  res: Response
) {
  const headersList = await headers();
  const authorisation = headersList.get("authorization");

  if (!authorisation || !authorisation.startsWith("Bearer ")) {
    Response.json({ message: "Unauthorized" });
    return;
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

  if (isTokenValid) {
    let apiKey = process.env.TINYMCE_API_URL;
    if (apiKey) return NextResponse.json(apiKey, { status: 200 })
    else return NextResponse.json({ message: "Api key for editor not found"}, { status: 404 });
  } else return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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