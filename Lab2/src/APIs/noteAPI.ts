import { Request, Response } from "express";
import fs from "fs";
import {NoteKeeper} from "../NoteKeeper";
import noteKeeper from "../NoteKeeper"
import {Note} from "../Note";
import jwt from "jsonwebtoken"
import {User} from '../User'

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response) => {
  

  // console.log(accessCheck(req.headers.Authorization[1]))
  accessCheck(req.headers.Authorization[1]) ? null : res.status(401) 
})

router.get("/:id", (req: Request, res: Response) => {
  
  res.send(noteKeeper.GET("note",+req.params.id));
});
router.post("/",(req: Request, res: Response)=>{
  
  res.send(noteKeeper.POST(req.body));
});
router.put("/:id", (req: Request, res: Response) => {
  res.send(noteKeeper.PUT(req.body,+req.params.id));
});
router.delete("/:id", (req: Request, res: Response) => {
    res.send(`Your object was deleted at ${noteKeeper.DELETE("note",+req.params.id)}`);  
});


const accessCheck = (token?:any) :boolean => {
    if(token == "undefined"){
      return false
    }
    const userByTkn = noteKeeper.Users.find(user=>user.token == token)
    if(userByTkn === undefined){
      console.log("false")
      return false
      
    }
    console.log("true")
    return true
}


export default module.exports = router