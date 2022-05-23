import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import { User } from "../dataModels/classes";


import dbConnector from "../dataModels/dbConnector";
import { IUser } from "../helpers/dataFormats";

const express = require("express");
const router = express.Router();

router.use((req: Request, res: Response, next: any) => {    
    
    dbConnector.authorizeCheck(req.headers.authorization!,res,next)
    
});

router.post("/:id", (req: Request, res: Response) => {
    dbConnector.forumPostCRUD.POST(req.params.id,req.body, res)
});
router.delete("/:threadID/:postID", (req: Request, res: Response) => {
    dbConnector.forumPostCRUD.DELETE(req.params.threadID,req.params.postID,res)
});






export default module.exports = router;
