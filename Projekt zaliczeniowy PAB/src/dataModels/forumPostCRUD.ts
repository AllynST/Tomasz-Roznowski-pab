import { Response } from "express";
import { threadModel } from "./schemas";

export default class forumPostCRUD{


    
    async POST(threadID:number,obj:any,res:Response){
        //TODO ADD ID CHECK
        const result = await threadModel.updateOne({_id:threadID},{$push:{post:obj}},)

        if(result.acknowledged){
            res.send(200)
        }
        else{
            res.status(404).send("Cannot modify obj with provided data")
        }

    }
    async PUT(threadID:number,postID:Number,obj:any,res:Response){

        const result = await threadModel.findOne({id:threadID})
        if(result.acknowledged){
            const index = result.posts.findIndex((post:any) => post.id === postID)
            if(index !== -1){
                result.posts[index] = obj
                result.save();
                return res.status(200).send("Object succesfully altered")
            }
            else{
                return res.status(404).send("Provided post id doesnt exist")
            }
        }
        
        else{
            return res.status(404).send("Provided thread id doesnt exist")
        }

    }
    async DELETE(threadID:number,postID:Number,res:Response){
        const result = await threadModel.findOne({id:threadID})
        if(result.acknowledged){
            const index = result.posts.findIndex((post:any) => post.id === postID)
            result.splice(index,1);
            result.save();

        }
        else{
            return res.status(404).send("Provided thread id doesnt exist")
        }
    }
}