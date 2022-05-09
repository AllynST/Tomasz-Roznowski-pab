import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import { secret } from "..";
import { User } from "../dataModels/classes";


import dbConnector from "../dataModels/dbConnector";
import { IUser } from "../helpers/dataFormats";

const express = require("express");
const router = express.Router();

//TODO: Authorization
router.use((req: Request, res: Response, next: any) => {    
    //TODO reenable authorization
    if(req.headers.Authorization == undefined) {return res.sendStatus(401)}
            if(!req.headers.Authorization.includes("Bearer ")){return res.sendStatus(401)}
            const token: string | undefined = req.headers.Authorization.split(' ')[1];
            
            jwt.verify(token!, secret, (err, user: any) => {
                req.params.user= user;
                //TODO CHANGE DO ENV
                if (err) return res.sendStatus(403);

            if(!user.admin) return res.status(403).send("You don't have access to this command")
            // 
    // dbConnector.authorizeCheck(req.headers.authorization!,res,next)
    next()
});

router.put("/:id", (req: Request, res: Response) => {
    //TODO PUT
});
router.post("/:id", (req: Request, res: Response) => {
    dbConnector.AdminCRUD.POST(req.params.id,req.body, res)
});
router.delete("/:threadID/:postID", (req: Request, res: Response) => {
    dbConnector.forumPostCRUD.DELETE(req.params.threadID,req.params.postID,res)
});






export default module.exports = router;
