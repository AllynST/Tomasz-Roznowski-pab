import { validJSON } from "../helpers/helperFunctions";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { userModel } from "./schemas";
import { User } from "./classes";
import "dotenv/config";

export default class userCRUD {
    async GET(id: number, res: Response){
        const response = await userModel.findOne({ id: id });
        if(response == null) return res.status(404).send("User with that id not found")
        else return res.status(200).send(response);
        
    }

    async POST_login(obj: any, res: Response) {
        if (obj == null) return res.status(404).send("This user doesnt exist");

        const attemptedLogin: User = obj;

        const match = await userModel.findOne({
            username: attemptedLogin.userName,
            password: attemptedLogin.password,
        });
       
        if (match != null) {
            const token: string = jwt.sign(obj, process.env.secret!);
            res.send("Bearer " + token);
        } else {
            return res.status(403).send("Incorrect password");
        }
        
    }
    async POST_register(obj: User, res: Response) {
        //FIXME rewrite register
        const user = new User(obj);
        if (user.admin) {
            return res
                .status(403)
                .send("By default all accounts must have admin set to false");
        }
        if (validJSON(user) && user instanceof User) {
            const token: string = jwt.sign(obj, process.env.secret!);
            const model = await new userModel(user);
            await model.save();
            res.send("Bearer " + token);
            //TODO add constraints to prevent adding accounts with invalid email etc.
        } else {
            res.sendStatus(400);
        }
    }
    async PUT(id: number, obj: any, res: Response) {
        const user = await userModel.findById(id)
        if(user == null) return res.status(404).send("User not found");
        if(user.userName == res.locals.user.userName || user.admin){
            const result = await userModel.updateOne({id:id},obj)
            if(result.modifiedCount == 1){
                res.status(200).send("User data updated successfully")
            }
            else{
                res.status(400).send("Wrong data format")
            }
        }
        else{
            res.status(403).send("You do not have permission to update this user")
        }
    }
    async DELETE(id: number, res: Response) {
         const user = await userModel.findById(id);
         if (user == null) return res.status(404).send("User not found");
         if (user.userName == res.locals.user.userName || user.admin) {
             const result = await userModel.deleteOne({id:id});
             if (result.deletedCount == 1) {
                 res.status(200).send("Account deleted successfully");
             } else {
                 res.status(400).send("Something went wrong");
             }
         } else {
             res.status(403).send(
                 "You do not have permission to delete this user"
             );
         }
    }
}
