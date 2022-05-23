import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken"

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response,next:any) => {  
  throw new Error("Not implemented endpoint")
  //TODO MAKE CATEGORIES CRUD
})


router.get("/:id", (req: Request, res: Response) => {
  
});
router.post("/",(req: Request, res: Response)=>{
  
});
router.put("/:id", (req: Request, res: Response) => {
  
});
router.delete("/:id", (req: Request, res: Response) => {
   
});


export default module.exports = router