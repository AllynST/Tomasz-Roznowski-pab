import { validJSON } from "../helpers/helperFunctions";
import jwt from 'jsonwebtoken'
import { Response } from "express";
import { userModel } from "./schemas";
import { User } from "./classes";
import { secret } from "..";


export default class userCRUD {
    async GET(id: number, res: Response): Promise<void> {
        const response = await userModel.findOne({ id: id });   

        
        res.send(response);
    }

    async POST_login(obj: any, res: Response) {

        if(obj == null) return res.sendStatus(401)
            
        const attemptedLogin:User = obj;

        const match = await userModel.findOne({attemptedLogin: attemptedLogin.email,password: attemptedLogin.password});
        console.log(match)
        if(match != null) {            
            const token: string = jwt.sign(obj, secret);
            res.send("Bearer "+token);
        }
        else{
            return res.sendStatus(403)
        }        
        //TODO finishing touches and correct errors
    }
    async POST_register(obj:User, res:Response) {
        console.log("register")
        const user = new User(obj)
        console.log(user)
        //TODO: Try catch to avoid wrong json input
        if(validJSON(user) && user instanceof User){
            const token: string = jwt.sign(obj,secret);
            const model = await new userModel(user)
            await model.save()
            res.send("Bearer " + token);
            //TODO add constraints to prevent adding accounts with invalid email etc.
        }
        else{
            res.sendStatus(400)
        }
        
    }
    async PUT(id: number, obj: any, res: Response) {
     
    }
    async DELETE(id: number, res: Response) {
       
    }
}
