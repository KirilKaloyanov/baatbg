// "use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

export default async function Serve() {
  const TinyMCEditor = dynamic(() => import("../../../components/richEditor"), {
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
      console.log("remote FB api key tiny", apiKey);
    } catch (error) {
      console.error("Error fetching TinyMCE API Key:", error);
    }
  }

    if (apiKey) return <TinyMCEditor apiKey={apiKey} />
    return <h1> Waiting for editor key</h1>

}
