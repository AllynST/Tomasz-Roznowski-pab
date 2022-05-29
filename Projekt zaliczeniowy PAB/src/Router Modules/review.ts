import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken"
import dbConnector from "../dataModels/dbConnector";

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response,next:any) => {  
  dbConnector.authorizeCheck(req.headers.authorization!,res,next)
  
})


router.get("/:id", (req: Request, res: Response) => {  
  dbConnector.reviewCRUD.GET(+req.params.id,res);
});

router.post("/:id",(req: Request, res: Response)=>{
  //adding a review to recipe with given id
    dbConnector.reviewCRUD.POST(+req.params.id,req.body, res);

});

router.put("/like/:recipeID/:reviewID", (req: Request, res: Response) => {
  dbConnector.reviewCRUD.Like(req.params.recipeID,req.params.reviewID, res)
});

router.put("/dislike/:recipeID/:reviewID", (req: Request, res: Response) => {
  dbConnector.reviewCRUD.Dislike(req.params.recipeID,req.params.reviewID, res)
});

router.delete("/:recipeID/:reviewID", (req: Request, res: Response) => {
  dbConnector.reviewCRUD.DELETE(req.params.recipeID,req.params.reviewID,res);
   
});


export default module.exports = router