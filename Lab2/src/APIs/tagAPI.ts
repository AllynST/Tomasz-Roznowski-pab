import { Request, Response } from "express";
import fs from "fs";
import {Note} from "../Note";
import jwt from "jsonwebtoken"
import {User} from '../User'

import {Tag} from '../Tag'
import {notes,users,tags} from '../dataMethods'

const express = require('express')
const router = express.Router()







// middleware that is specific to this router
router.use((req: Request, res: Response,next:any) => {
  
  const token = req.headers.authorization
  
  if (token === undefined){
      res.sendStatus(401)
  }
  else{
    if(accessCheck(token)){
      next()
    }
    else{
      res.sendStatus(401) 
    }
        
  }

})

router.get("/:id", (req: Request, res: Response) => {
  const obj = tags.find((tag) => tag.id === +req.params.id)  
  res.send(obj);
});
router.post("/",(req: Request, res: Response)=>{
  const obj:Tag = req.body
  tags.push(obj)
  //updateStorage();
  res.send();
});
router.put("/:id", (req: Request, res: Response) => {
  const obj = req.body;
  const ChangeIndex = tags.findIndex((Note) => Note.id == +req.params.id);
  tags[ChangeIndex] = obj;
  //updateStorage();
  res.send();
});
router.delete("/:id", (req: Request, res: Response) => {

  tags.splice(tags.findIndex(obj => obj.id === +req.params.id),1)
  //updateStorage();
       
  res.send(`Your object was deleted at ${req.params.id}`);  
});


const accessCheck = (token?:any) :boolean => {
    if(token == "undefined"){
      return false
    }
    const userByTkn = users.find(user=>user.token == token)
    if(userByTkn === undefined){
      console.log("false")
      return false
      
    }
    console.log("true")
    return true
}


export default module.exports = router