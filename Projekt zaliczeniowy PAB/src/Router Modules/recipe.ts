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

router.get("/:id", (req: Request, res: Response) => {
    dbConnector.recipeCRUD.GET(+req.params.id, res);
});
router.post("/", (req: Request, res: Response) => {
    dbConnector.recipeCRUD.POST(req.body, res);
});
router.put("/:id", (req: Request, res: Response) => {
    dbConnector.recipeCRUD.PUT(+req.params.id, req.body, res);
});
router.delete("/:id", (req: Request, res: Response) => {
    dbConnector.recipeCRUD.DELETE(+req.params.id, res);
});

export default module.exports = router;
