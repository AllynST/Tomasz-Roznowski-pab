import { Response } from "express";
import { threadModel } from "./schemas";

export default class forumThreadCRUD {

    async GET_ALL(res: Response) {
        const response = await threadModel.find();
        return res.send(response);
    }
    async GET(id: number, res: Response) {
        const response = await threadModel.findOne({ id: id });
        response.posts
        if (response == null) {
            return res.send(404);
        } else {
            res.send(response);
        }
        
    }
    async POST(obj: any, res: Response) {
        //TODO check if obj is valid

        const model = await new threadModel(obj)
        model.save()
        return res.status(200)

    }
    async PUT(id: number, obj: any,res:Response) {

        const altered = await threadModel.findByIdAndUpdate({id:id},obj)
        if(altered.success){
            return res.send(200)
        }
        else{
            return res.send(404)
        }
        

    }
    async DELETE(id: number, res: Response) {
        const deleted = await threadModel.deleteOne({id:id})
        if(deleted.acknowledged){
            return res.send(200)
        }
        else{
            return res.send(404)
        }
    }
}
