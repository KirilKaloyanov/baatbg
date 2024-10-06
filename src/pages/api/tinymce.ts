import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('hendler')
    const response = await fetch('https://tinymceapikey-jme-7y3mjja-uc.a.run.app'); // Replace with your function URL
    const data = await response.json();

    res.status(200).json(data);
}
