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

router.post("/Login",(req: Request, res: Response)=>{

    const attemptedLoginInd = users.findIndex((x) => x.userName == req.body.userName)
  
    
    if(users[attemptedLoginInd].password === req.body.password){
      
      users[attemptedLoginInd].setToken(jwt.sign({userName:req.body.userName,password:req.body.password},"oijowijgoirj"));
      console.log(users[attemptedLoginInd].token)
      res.sendStatus(200);
    }
    else{
      res.sendStatus(401);
    }
    
  })

router.post('/Register',(req: Request, res: Response) =>{
  
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