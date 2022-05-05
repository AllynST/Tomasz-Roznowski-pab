import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import { User } from "../dataModels/classes";
require("dotenv").config({ path: "../secret.env" });

import dbConnector from "../dataModels/dbConnector";
import { IUser } from "../helpers/dataFormats";

const express = require("express");
const router = express.Router();

//TODO: Authorization
router.use((req: Request, res: Response, next: any) => {    
    dbConnector.authorizeCheck(req.headers.authorization!,res,next)
});

router.get("/thread/:id", (req: Request, res: Response) => {
   
});
router.post("/thread", (req: Request, res: Response) => {
    
});
router.put("/thread/:id", (req: Request, res: Response) => {
    
});
router.delete("/thread/:id", (req: Request, res: Response) => {
    
});

router.get("/posts/:id", (req: Request, res: Response) => {
   
});
router.post("/posts", (req: Request, res: Response) => {
    
});
router.put("/posts/:id", (req: Request, res: Response) => {
    
});
router.delete("/posts/:id", (req: Request, res: Response) => {
    
});

export default module.exports = router;
