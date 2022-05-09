import mongoose from "mongoose";
import {Response} from 'express'
import { Recipe} from "./classes";
import jwt from "jsonwebtoken";
import recipeCRUD from "./recipeCRUD";
import reviewCRUD from "./reviewCRUD";
import { recipeModel } from "./schemas";
import userCRUD from "./userCRUD";
import { secret } from "..";
import forumThreadCRUD from "./forumThreadCRUD";
import forumPostCRUD from "./forumPostCRUD";
import { AdminPanel } from "./adminPanel";

class dbConnector {

    recipeCRUD:recipeCRUD;
    reviewCRUD:reviewCRUD;
    userCRUD:userCRUD;
    forumThreadCRUD:forumThreadCRUD;
    forumPostCRUD:forumPostCRUD;
    AdminPanel:AdminPanel;
    //categorieCRUD:categorieCRUD;

    //TODO: connect other endpoints

    constructor() {
        this.dbConnect();
        this.recipeCRUD = new recipeCRUD();
        this.reviewCRUD = new reviewCRUD();
        this.userCRUD = new userCRUD();
        //this.categorieCRUD = new categorieCRUD();
        this.forumThreadCRUD = new forumThreadCRUD();
        this.forumPostCRUD = new forumPostCRUD();
        this.AdminPanel = new AdminPanel();
        //this.findObjByID(2,"recipe")
    }

    async authorizeCheck(header:string, res:Response,next?:any){
        //401 no token
        //403 invalid token or data format

        
       
        if(header == undefined) {return res.sendStatus(401)}
            if(!header.includes("Bearer ")){return res.sendStatus(401)}
            const token: string | undefined = header.split(' ')[1];

            jwt.verify(token!, secret, (err, user: any) => {
                //TODO CHANGE DO ENV
                if (err) return res.sendStatus(403);

                res.locals.user = user;

            //     //Wrong data format
            //    else if (!(user instanceof User)) {
            //         return res.sendStatus(403);
            //     }
                
                if(next != undefined){
                    next();
                }
                
            });   
        
      
        
    }

    async dbConnect() {
        try {
            const db = await mongoose.connect(
                "mongodb+srv://Allyn:zaq1%40WSX@recipewebsitepab.sh30a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
            );
        } catch (err) {
            throw new Error("database connection failed");
        } finally {
            console.log("Database connection succesfull");
        }
    }

    async findObjByID(id: number, type: string): Promise<Recipe> {
        console.log("find is working");
        const before= await recipeModel.findOne({id:id});

        console.log(before)
        return before;
    }
}

export default new dbConnector();
