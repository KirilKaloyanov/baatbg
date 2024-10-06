import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('hendler')
    const response = await fetch('https://us-central1-baatbgorg.cloudfunctions.net/tinymceApiKey'); // Replace with your function URL
    // const data = await response.json();
    console.log(response)

    // res.status(200).json(data);
}
