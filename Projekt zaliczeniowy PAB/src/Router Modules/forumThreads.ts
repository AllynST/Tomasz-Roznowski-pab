import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import { User } from "../dataModels/classes";
require("dotenv").config({ path: "../secret.env" });

import dbConnector from "../dataModels/dbConnector";
import { IUser } from "../helpers/dataFormats";

const express = require("express");
const router = express.Router();


router.use((req: Request, res: Response, next: any) => {
    dbConnector.authorizeCheck(req.headers.authorization!,res,next)    
});


router.get("/all", (req: Request, res: Response) => {
   dbConnector.forumThreadCRUD.GET_ALL(res);
});
router.get("/:id", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.GET(+req.params.id,res)
 });
router.post("/", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.POST(req.body,res)
});
router.put("/:id", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.PUT(req.params.id,req.body,res)
});
router.put("/archive/:id", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.Archive(req.params.id,res);
});
router.put("/restore/:id", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.Restore(req.params.id,res);
});
router.delete("/:id", (req: Request, res: Response) => {
    dbConnector.forumThreadCRUD.DELETE(req.params.id,res)
});






export default module.exports = router;
