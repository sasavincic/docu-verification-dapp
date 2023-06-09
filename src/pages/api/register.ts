import {NextApiRequest, NextApiResponse} from "next";
import {authorizeUsersOnBlockchain} from "@/lib/UserService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;

    switch (method) {
        case "POST":
            console.log(req.body);
            const response: boolean = await authorizeUsersOnBlockchain(req.body.addresses, req.body.signer);
            if (!response) {
                res.status(500).json(response);
                break;
            }
            res.status(201).json(response);
            break;

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}