import { threadModel, userModel } from "./schemas";
import {Response} from "express"

export class AdminPanel {
    async giveAdmin(id: string, res: Response) {
        let result = await userModel.findByIdAndUpdate(id, { admin: true });

        if (result.modifiedCount === 1) {
            return res.status(200).send("Admin granted!");
        } else {
            return res.status(404).send("User not found");
        }
    }

    async adminPinThread(threadID:string,res:Response) {
        let result = await threadModel.findByIdAndUpdate(threadID, { pinned:true});
        if (result.modifiedCount === 1) {
            return res.status(200).send("Thread pinned!");
        } else {
            return res.status(404).send("No thread found with provided id");
        }
    }
}