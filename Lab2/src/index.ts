import { notStrictEqual } from "assert";
import { create } from "domain";
import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import {NoteKeeper} from "./NoteKeeper";
import {Note} from "./Note";

import {Tag} from "./Tag"

const app = express();

const date = new Date();



export const noteKeeper = new NoteKeeper();





app.use(express.json());

//Note API
app.get("/note/:id", (req: Request, res: Response) => {
  res.send(noteKeeper.GET("note",+req.params.id));
});
app.post("/note",(req: Request, res: Response)=>{ 
  res.send(noteKeeper.POST(req.body));
});
app.put("/note/:id", (req: Request, res: Response) => {
  res.send(noteKeeper.PUT(req.body,+req.params.id));
});
app.delete("/note/:id", (req: Request, res: Response) => {
  res.send(`Your object was deleted at ${noteKeeper.DELETE("note",+req.params.id)}`);  
});
//
//Notes API
app.get("/notes", (req: Request, res: Response) => {
  res.send(noteKeeper.notesArr);
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
  res.send(noteKeeper.PUT(req.body,+req.params.id));
});

app.delete("/tag/:id", (req: Request, res: Response) => {    
  res.send(`Your object was deleted at ${noteKeeper.DELETE("tag",+req.params.id)}`);
  
});
//Tags API
app.get("/tags", (req: Request, res: Response) => {
  res.send(noteKeeper.getTagsList());
});

app.listen(3000);
