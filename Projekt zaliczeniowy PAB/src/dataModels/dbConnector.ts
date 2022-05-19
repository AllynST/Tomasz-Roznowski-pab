import mongoose from "mongoose";
import { Response } from "express";
import { Recipe } from "./classes";
import jwt from "jsonwebtoken";
import recipeCRUD from "./recipeCRUD";
import reviewCRUD from "./reviewCRUD";
import { recipeModel } from "./schemas";
import userCRUD from "./userCRUD";
import forumThreadCRUD from "./forumThreadCRUD";
import forumPostCRUD from "./forumPostCRUD";
import { AdminPanel } from "./adminPanel";
import "dotenv/config";

class dbConnector{
    recipeCRUD: recipeCRUD;
    reviewCRUD: reviewCRUD;
    userCRUD: userCRUD;
    forumThreadCRUD: forumThreadCRUD;
    forumPostCRUD: forumPostCRUD;
    AdminPanel: AdminPanel;
    //categorieCRUD:categorieCRUD;

    constructor() {
        this.dbConnect();
        this.recipeCRUD = new recipeCRUD();
        this.reviewCRUD = new reviewCRUD();
        this.userCRUD = new userCRUD();
        //this.categorieCRUD = new categorieCRUD();
        this.forumThreadCRUD = new forumThreadCRUD();
        this.forumPostCRUD = new forumPostCRUD();
        this.AdminPanel = new AdminPanel();
    }

    authorizeCheck(header: string, res: Response, next?: any) {
        //401 no token
        //403 invalid token or data format

        if (header == undefined) {
            return res.status(401).send("No token found");
        }
        if (!header.includes("Bearer ")) {
            return res.status(401).send("Your token need to be in Bearer schema('Bearer yourToken')");
        }
        const token: string | undefined = header.split(" ")[1];

        jwt.verify(token!, process.env.secret!, (err, user: any) => {
            if (err) return res.status(403).send("Your token is incorrect or expired");

            res.locals.user = user;

            if (next != undefined) {
                next();
            }
        });
    }

    async dbConnect() {
        try {
            const db = await mongoose.connect(process.env.dbConString!);
        } catch (err) {
            throw new Error("database connection failed");
        } finally {
            console.log("Database connected");
        }
    }

    async findObjByID(id: number, type: string): Promise<Recipe> {
        console.log("find is working");
        const before = await recipeModel.findOne({ id: id });

        console.log(before);
        return before;
    }
}

export default new dbConnector();