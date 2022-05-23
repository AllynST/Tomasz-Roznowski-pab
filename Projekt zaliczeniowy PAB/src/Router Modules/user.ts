import { Request, Response } from "express";
import dbConnector from "../dataModels/dbConnector";


const express = require("express");
const router = express.Router();

router.use((req: Request, res: Response, next: any) => {
    next();
});

//prywatne  dane o koncie
router.get("/:id", (req: Request, res: Response) => {
  dbConnector.authorizeCheck(req.headers.authorization!,res)
  if(res.locals.user!=null){
    dbConnector.userCRUD.GET(+req.params.id, res);
  } 
});
//login
router.post("/Login", (req: Request, res: Response) => {
    dbConnector.userCRUD.POST_login(req.body,res)
    
});
//Register
router.post("/Register", (req: Request, res: Response) => {
  dbConnector.userCRUD.POST_register(req.body,res)  
});

router.post("/Logout/:id",(req: Request, res: Response) => {
  res.locals.token = req.headers.authorization!;
  dbConnector.userCRUD.LogOut(req.params.id,res)  
});
router.put("/:id", (req: Request, res: Response) => {
    //const payload = jwt.verify(token, secret)
    //zmiana danych użytkownika po potwierdzeniu hasła
});
//usuwanie konta po potwierdzeniu hasła
router.delete("/:id", (req: Request, res: Response) => {});

export default module.exports = router;
