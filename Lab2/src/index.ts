import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import {NoteKeeper} from "./NoteKeeper";


import jwt from "jsonwebtoken"
import {User} from './User'

import NoteAPI from './APIs/noteAPI'

import {Tag} from "./Tag"



const app = express()

const users:User[] = []

app.use(express.json());

const dataMethod = await fs.promises.readFile("")

const noteKeeper = new NoteKeeper()


noteKeeper.Users = [
  new User("Allyn","zaq1@WSX"),
  new User("Allyn2","zaq1@WSX"),
  new User("Ally3","zaq1@WSX"),
  new User("Allyn4","zaq1@WSX"),
]



//LOGOWANIE
app.post("/Login",(req: Request, res: Response)=>{

  const attemptedLoginInd = noteKeeper.Users.findIndex((x) => x.userName == req.body.userName)

  
  if(noteKeeper.Users[attemptedLoginInd].password === req.body.password){
    
    noteKeeper.Users[attemptedLoginInd].setToken(jwt.sign({userName:req.body.userName,password:req.body.password},"oijowijgoirj"));
    console.log(noteKeeper.Users[attemptedLoginInd].token)
    res.sendStatus(200);
  }
  else{
    res.sendStatus(401);
  }
  
})



//Note API

//
//Notes API
app.get("/notes/user/:userName", (req: Request, res: Response) => {
  const reqUser = req.params.userName;  
  const response = noteKeeper.notesArr.filter(note =>note.author == reqUser && note.visible)

});
//
//TAG API
app.get("/tag/:id", (req: Request, res: Response) => {
    res.send(noteKeeper.GET("tag",+req.params.id));
});

app.post("/tag", function (req: Request, res: Response) {
    let addedObject = new Tag(req.body.name);
  noteKeeper.POST(addedObject);
  res.send(`Your tag was created at ${addedObject.id}`);
});
app.put("/tag/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization 
  res.send(noteKeeper.PUT(req.body,+req.params.id));
});

app.delete("/tag/:id", (req: Request, res: Response) => {
  const authData = req.headers.Authorization    
  res.send(`Your object was deleted at ${noteKeeper.DELETE("tag",+req.params.id)}`);
  
});
//Tags API
app.get("/tags", (req: Request, res: Response) => {
  
  res.send(noteKeeper.getTagsList());
});
console.log("App started")


app.use('/note', NoteAPI)
app.listen(3000);
