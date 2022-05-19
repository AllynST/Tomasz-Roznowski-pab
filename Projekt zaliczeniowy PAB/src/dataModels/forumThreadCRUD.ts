import { Response } from "express";
import mongoose from "mongoose";
import { threadModel } from "./schemas";

export default class forumThreadCRUD {
    async GET_ALL(res: Response) {
        const response = await threadModel.find();
        return res.status(200).send(response);
    }
    async GET(id: number, res: Response) {
        const response = await threadModel.findOne({ id: id });
        if (response == null) {
            return res.status(404).send("Thread with provided ID doesnt exist");
        } else {
            res.status(200).send(response);
        }
    }
    async POST(obj: any, res: Response) {
        //TODO check if obj is valid
        const model = await new threadModel(obj);
        let error: Error;
        model
            .save()
            .catch((err: Error) => {
                error = err;
            })
            .then(() => {
                if (!error) {
                    return res.status(200).send("Thread added");
                } else {
                    return res.status(400).send("Something went wrong");
                }
            });
    }
    async PUT(id: string, obj: any, res: Response) {
        const check :any = threadModel.findById(id);
        if(check == null){
            return res.status(404).send("Thread with  that id doesnt exist")
        }
        let result = await threadModel.findOneAndUpdate({id:id},obj)
        if(check.createdBy.userName == res.locals.user.userName || res.locals.user.admin){
            if (result.modifiedCount === 1) {
                return res.status(200).send("Thread changed");
            } else {
                return res.status(404).send("Something went wrong");
            }
        }
        else{
            return res.status(403).send("You dont have permmision to modify this thread")
        }
    }
    async DELETE(id: string, res: Response) {

        const test:any = await threadModel.findById(id)
        if(test.createdBy.userName == res.locals.user.userName || res.locals.user.admin){
            const deleted = await threadModel.deleteOne({ _id: id });
            if (deleted.deletedCount === 1) {
                return res.status(200).send("Object deleted");
            } else {
                return res
                    .status(404)
                    .send("No object found withn provided ID");
            }
        }
        else{
            res.status(403).send("You dont have perrmision to delete tha thread")
        }
        
    }
}
