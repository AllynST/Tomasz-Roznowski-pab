import { Response } from "express";
import { validateUser } from "../helpers/helperFunctions";
import { postValidator } from "../helpers/JoiValidators";
import { threadModel } from "./schemas";

export default class forumPostCRUD {
    

    async POST(threadID: string, obj: any, res: Response) {
        
        const postValidation= postValidator(obj).error ;

        if(postValidation) return res.status(400).send(postValidation.details[0].message);

        obj.addedBy = {
            userName: res.locals.user.userName,
            admin: res.locals.user.admin
        }  

        const result = await threadModel.findById(threadID);
        if(result == undefined) return res.status(404).send("No thread found with provided ID")
        result.posts = [...result.posts, obj];
        
        let error: Error;
        result
            .save()

            .catch((err: Error) => {
                error = err;
                return res
                    .status(404)
                    .send("Cannot modify obj with provided data");
            })
            .then(() => {
                if (!error) return res.status(200).send("Post added");
            });
    }
    async PUT(threadID: number, postID: Number, obj: any, res: Response) {
        
        const postValidation = postValidator(obj).error;

        if (postValidation) return res.status(400).send(postValidation.details[0].message);
        
        const result = await threadModel.findOne({ _id: threadID });
        if (result.acknowledged) {
            const index = result.posts.findIndex(
                (post: any) => post.id === postID
            );
            if (index !== -1) {
                result.posts[index] = obj;
                result.save();
                return res.status(200).send("Object succesfully altered");
            } else {
                return res.status(404).send("Provided post id doesnt exist");
            }
        } else {
            return res.status(404).send("Provided thread id doesnt exist");
        }
    }
    async DELETE(threadID: string, postID: string, res: Response) {
        try {
            const result = await threadModel.findById(threadID);
            if (!result)
                return res
                    .status(404)
                    .send("Thread with provided data doesnt exist");
            const test = result.posts.findIndex((x: any) => x.id == postID);
            if (test == -1)
                return res
                    .status(404)
                    .send("Post with provided data doesnt exist");
            let error: Error;
            if(validateUser(result,res.locals)){
                result.posts.pull(postID);
            result
                .save()
                .catch((err: Error) => {
                    console.log(err.message);
                    error = err;
                })
                .then(() => {
                    if (!error) res.status(200).send("object deleted");
                });
            }
            else{
                return res.status(401).send("You dont have permission to delete this object");
            }
            
        } catch (err) {
            return res
                .status(412)
                .send("Provided data did not match the template");
        }
    }
}
