
import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import dbConnector from "../dataModels/dbConnector";
import {validJSON} from '../helpers/helperFunctions'

console.log("userROUTER working")

const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: any) => {
    next();
});

//publiczne dane o koncie
router.get("/:id", (req: Request, res: Response) => {
  //FIXME sending 2 headers
  const test = dbConnector.authorizeCheck(req.headers.authorization!,res)
  dbConnector.userCRUD.GET(+req.params.id,res)
  
});
//login
router.post("/Login", (req: Request, res: Response) => {
    dbConnector.userCRUD.POST_login(req.body,res)
    
});
//Register
router.post("/Register", (req: Request, res: Response) => {
  console.log(req.body)
  dbConnector.userCRUD.POST_register(req.body,res)

});
router.put("/:id", (req: Request, res: Response) => {
    //const payload = jwt.verify(token, secret)
    //zmiana danych użytkownika po potwierdzeniu hasła
});
//usuwanie konta po potwierdzeniu hasła
router.delete("/:id", (req: Request, res: Response) => {});

export default module.exports = router;
