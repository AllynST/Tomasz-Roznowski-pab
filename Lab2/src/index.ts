import express from "express";
import { Request, Response } from "express";
import fs from "fs";

import {notes,users,tags} from './dataMethods'

import jwt from "jsonwebtoken"

import NoteAPI from './APIs/noteAPI'
import TagAPI from './APIs/tagAPI'
import UserAPI from './APIs/userAPI'


const constring = "mongodb+srv://Allyn:<password>@noteapp.8tedy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



const app = express()


app.use(express.json());

const config = "filesystem"


if(config === "filesystem"){
  
}


async function test(){
  return await fs.promises.readFile("./src/config.json", 'utf-8');
}

console.log(test())


//LOGOWANIE

//Notes API
app.get("/notes/user/:userName", (req: Request, res: Response) => {
  const reqUser = req.params.userName;  
  const response = notes.filter(note =>note.author == reqUser && note.visible)

});

app.get("/tags", (req: Request, res: Response) => {
  
  res.send(notes);
});
console.log("App started")


app.use('/note', NoteAPI)
app.use('/tag', TagAPI)
app.use('/user', UserAPI)
app.listen(3000);
