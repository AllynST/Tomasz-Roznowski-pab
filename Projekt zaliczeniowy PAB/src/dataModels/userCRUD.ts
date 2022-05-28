import { validateUser} from "../helpers/helperFunctions";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { userModel } from "./schemas";
import { User } from "./classes";
import "dotenv/config";
import { IdValidator, userValidator } from "../helpers/JoiValidators"

var CryptoJS = require("crypto-js");

export default class userCRUD {

    async GET(id: number, res: Response){
        const response = await userModel.findOne({ id: id });
        if(response == null) return res.status(404).send("User with that id not found")
        if(validateUser(response,res.locals)){
            return res.status(200).send(response); 
        }
        else{
            return res.status(402).send("You dont have permission to view this user data")
        }
        
        
    }

    async POST_login(obj: any, res: Response) {
        if (obj == null) return res.status(404).send("Provide login information first");

        const match = await userModel.findOne({
            userName: obj.userName,
        });        
        
        if (match != null) {            
            const targetPassword = CryptoJS.AES.decrypt(match.password, process.env.secret).toString(CryptoJS.enc.Utf8);
            
            if(obj.password == targetPassword){
                
                const token: string = jwt.sign(obj, process.env.secret!);
                return res.status(200).send("Bearer " + token);
            }
            else{
                return res.status(403).send("Incorrect password")
            }
            
            
        } else {
            return res.status(403).send("Invalid username");
        }
        
    }
    async POST_register(obj: User, res: Response) {

        const {error} = userValidator(obj)
        if(error) return res.status(400).send(error.details[0].message)

        //FIXME rewrite register
        obj.password = CryptoJS.AES.encrypt(obj.password, process.env.secret).toString()
        obj.admin = false;       
        
        
            const token: string = jwt.sign(obj, process.env.secret!);
            const model = await new userModel(obj);
            await model.save();
            res.send("Bearer " + token);
           
       
    }
    async PUT(id: string, obj: any, res: Response) {
        const Iderror = IdValidator(id).error
        if(Iderror) return res.status(400).send(Iderror.details[0].message);

        const {error} = userValidator(obj)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await userModel.findById(id)
        if(user == null) return res.status(404).send("User not found");
        if(validateUser(user, res.locals)){
            obj.password = CryptoJS.AES.encrypt(obj.password, process.env.secret).toString()
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
    async LogOut(id:string,res: Response) {

        const user = await userModel.findById(id)
        if(res.locals.token == null) return res.status(412).send("No token provided")
        if(validateUser(user ,res.locals)){
            //TODO delete hash from db
        }
        else{
            return res.status(403).send("You dont have permission to log out this user")
        }
    }

    async DELETE(id: number, res: Response) {
         const user = await userModel.findById(id);
         if (user == null) return res.status(404).send("User not found");
         if (validateUser(user, res.locals)) {
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

