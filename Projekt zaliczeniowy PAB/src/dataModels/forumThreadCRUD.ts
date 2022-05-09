import { Response } from "express";
import mongoose from "mongoose";
import { threadModel} from "./schemas";

export default class forumThreadCRUD {

    async GET_ALL(res: Response) {
        const response = await threadModel.find();
        return res.status(200).send(response);
    }
    async GET(id: number, res: Response) {
        
        const response = await threadModel.findOne({ id: id });
        response.posts
        if (response == null) {
            return res.status(404).send("Thread with provided ID doesnt exist");
        } else {
            res.status(200).send(response);
        }
        
    }
    async POST(obj: any, res: Response) {
        //TODO check if obj is valid
        const model = await new threadModel(obj)
        model.save()
        return res.status(200).send("Thread added")

    }
    async PUT(id: string, obj: any,res:Response) {
        

        try{
            const altered = await new threadModel(obj)
            //FIXME FIX ITS JUST WRONG
            await altered.save().then(()=>{                
                res.status(201).send("Thread changed")
                }                
            )
        }
        catch(err){
            return res.status(404).send("Something went wrong")
        }
       
    }
    async DELETE(id: string, res: Response) {
        const deleted = await threadModel.deleteOne({_id:id})
        console.log(deleted)
        if(deleted.deletedCount === 1){
            return res.status(200).send("Object deleted")
        }
        else{
            return res.status(404).send("No object found withn provided ID")
        }
    }
}
