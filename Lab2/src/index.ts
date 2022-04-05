import { notStrictEqual } from "assert";
import { create } from "domain";
import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import {NoteKeeper} from "./NoteKeeper";
import noteKeeper from "./NoteKeeper"
import {Note} from "./Note";
import jwt from "jsonwebtoken"
import {User} from './User'

import {Tag} from "./Tag"

const app = express();

const date = new Date();

const users:User[] = []

app.use(express.json());

noteKeeper.Users = [
  new User("Allyn","zaq1@WSX"),
  new User("Allyn2","zaq1@WSX"),
  new User("Ally3","zaq1@WSX"),
  new User("Allyn4","zaq1@WSX"),
]

//LOGOWANIE
app.post("/Login",(req: Request, res: Response)=>{


  console.log(`login ${req.body.userName}`)
  console.log(`login ${req.body.password}`)

  const attemptedLoginInd = noteKeeper.Users.findIndex((x) => x.userName == req.body.userName)
  console.log(attemptedLoginInd)
  
  if(noteKeeper.Users[attemptedLoginInd].password === req.body.password){
    
    noteKeeper.Users[attemptedLoginInd].setToken(jwt.sign({userName:req.body.userName,password:req.body.password},"oijowijgoirj"));
    console.log(noteKeeper.Users[attemptedLoginInd])
    res.sendStatus(200);
  }
  else{
    res.sendStatus(401);
  }
  
})


//Note API
app.get("/note/:id", (req: Request, res: Response) => {

  const authData = req.headers.Authorization
  console.log(authData);
  
  res.send(noteKeeper.GET("note",+req.params.id,authData));
});
app.post("/note",(req: Request, res: Response)=>{
  const authData = req.headers.Authorization 
  res.send(noteKeeper.POST(req.body,authData));
});
app.put("/note/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization
  res.send(noteKeeper.PUT(req.body,+req.params.id,authData));
});
app.delete("/note/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization
  res.send(`Your object was deleted at ${noteKeeper.DELETE("note",+req.params.id,authData)}`);  
});
//
//Notes API
app.get("/notes", (req: Request, res: Response) => {
  res.send(noteKeeper.notesArr);
});
//
//TAG API
app.get("/tag/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization  
  res.send(noteKeeper.GET("tag",+req.params.id,authData));
});

app.post("/tag", function (req: Request, res: Response) {
  const authData = req.headers.Authorization
  let addedObject = new Tag(req.body.name);
  noteKeeper.POST(addedObject);
  res.send(`Your tag was created at ${addedObject.id,authData}`);
});
app.put("/tag/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization 
  res.send(noteKeeper.PUT(req.body,+req.params.id,authData));
});

app.delete("/tag/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization    
  res.send(`Your object was deleted at ${noteKeeper.DELETE("tag",+req.params.id,authData)}`);
  
});
//Tags API
app.get("/tags", (req: Request, res: Response) => {
  
  res.send(noteKeeper.getTagsList());
});
console.log("App started")
app.listen(3001);
