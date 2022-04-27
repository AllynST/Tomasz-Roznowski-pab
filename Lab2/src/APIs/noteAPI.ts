import { Request, Response } from "express";
import fs from "fs";
import {dataMethod} from '../dataMethods'



import jwt from "jsonwebtoken"

//import z require zrobiony w celu nadania typu
const dataMethodValue:dataMethod = require('../dataMethods')

import {Note} from "../Note";
import {Tag} from '../Tag'
import {User} from '../User'

const express = require('express')
const router = express.Router()

export let notes:Note[] = []
export let tags:Tag[] = []
export let users:User[] = [
  new User("Allyn","zaq1@WSX"),
  new User("Allyn2","zaq1@WSX"),
  new User("Ally3","zaq1@WSX"),
  new User("Allyn4","zaq1@WSX"),
]





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
  let obj :any;
  if(dataMethodValue.datamethod === "filesystem"){
     obj = notes.find(d => d.id === +req.params.id)
  }
  else{
      //const obj = await Adventure.findById(id).exec();
      obj = null;
  }
  res.send(obj);
});
router.post("/",(req: Request, res: Response)=>{
  const obj:Note = req.body
  notes.push(obj)
  dataMethodValue.updateStorage();
  res.send("object added");
});
router.put("/:id", (req: Request, res: Response) => {
  const obj = req.body;
  const ChangeIndex = notes.findIndex((Note) => Note.id == +req.params.id);
  dataMethodValue.updateStorage();
  res.send();
});
router.delete("/:id", (req: Request, res: Response) => {

  notes.splice(notes.findIndex(obj => obj.id === +req.params.id),1)
  dataMethodValue.updateStorage();
       
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