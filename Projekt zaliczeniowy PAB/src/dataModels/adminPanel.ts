import { userModel } from "./schemas";
import {Response} from "express"

export class AdminPanel{
    
    async giveAdmin(id:string,res:Response){
       let result =  await userModel.findByIdAndUpdate(id,{admin:true});

        if(result.modifiedCount === 1){
            return res.status(200).send("Admin granted!");
        }
        else{
            return res.status(404).send("User not found");
        }
    }

}