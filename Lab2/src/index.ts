import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import {notes,users,tags} from './dataMethods'

import jwt from "jsonwebtoken"

import NoteAPI from './APIs/noteAPI'
import TagAPI from './APIs/tagAPI'
import UserAPI from './APIs/userAPI'

// setTimeout(()=>{console.log(notes)},500);


const app = express()


app.use(express.json());

//LOGOWANIE

//Notes API
app.get("/notes/user/:userName", (req: Request, res: Response) => {
  const reqUser = req.params.userName;  
  const response = notes.filter(note =>note.author == reqUser && note.visible)

});

app.get("/tags", (req: Request, res: Response) => {
  
  res.send();
});



app.use('/note', NoteAPI)
app.use('/tag', TagAPI)
app.use('/user', UserAPI)
console.log("App started")
app.listen(3000);
