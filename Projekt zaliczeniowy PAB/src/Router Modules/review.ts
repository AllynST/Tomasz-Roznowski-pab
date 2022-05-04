import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken"
import dbConnector from "../dataModels/dbConnector";

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response,next:any) => {  
  //const token = req.headers.authorization
  next();
  
})


router.get("/:id", (req: Request, res: Response) => {
  //TODO: zwracanie wszystkich opini dla przepisu o podanym id
  dbConnector.reviewCRUD.GET(+req.params.id,res);
});

router.post("/:id",(req: Request, res: Response)=>{
  //adding a review to recipe with given id
    dbConnector.reviewCRUD.POST(+req.params.id,req.body, res);

});
router.put("/:id", (req: Request, res: Response) => {
  //You cannot change the content of posted review
  // Changing the content of a review may lead to giving false information(likes and dislikes)
  res.sendStatus(404);
});
router.delete("/:recipeID/:reviewID", (req: Request, res: Response) => {
  dbConnector.reviewCRUD.DELETE(+req.params.recipeID,+req.params.reviewID,res);
   //splice konkretnego obiektu i update
});


export default module.exports = router