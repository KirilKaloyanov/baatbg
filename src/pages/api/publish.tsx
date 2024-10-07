import { NextApiRequest, NextApiResponse } from "next";

let contentStore: string | null = null;

export default function handler( req: NextApiRequest, res: NextApiResponse  ) {
    if (req.method == "POST") {
        const { content } = req.body;
        console.log(content)

        if (!content) {
            return res.status(400).json({error: "Content is required"});
        }
        contentStore = content;

        return res.status(200).json({ message: "Success"});
    }

    if (req.method = "GET" ) {
        return res.status(200).json({ content: contentStore});
    }
    
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method${req.method} not Allowed`);
}
