import { notStrictEqual } from "assert";
import { create } from "domain";
import express from "express";
import { Request, Response } from "express";
import fs from "fs";
const app = express();

const date = new Date();



class Tag {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    if (id == undefined) {
      this.id = Date.now();
    } else {
      this.id = id;
    }
    this.name = name;
  }
}

class Note {
  id: number;
  title: string;
  content: string;
  createDate: string;
  tags: Tag[];

  constructor(
    title: string,
    content: string,
    createDate: string,
    tags: Tag[],
    id?: number
  ) {
    if (id === undefined) {
      this.id = Date.now();
    } else {
      this.id = id;
    }

    tags.forEach(tag =>()=>{
      if(!tagsArr.includes(tag)){
        tagsArr.push(tag)
      }
    })

    this.title = title;
    this.content = content;
    this.createDate = createDate;
    this.tags = tags;
  }
}

// class NoteKeeper{
//    notes = [
//     new Note("UXUI","Design landing page","23.03.2022",[new Tag("UXUI"),new Tag("UXUI"),new Tag("Design"),new Tag("Visuals")],1),
//     new Note("TEST2","TEST2","test2",[new Tag("Frontend")],2),
//     new Note("TEST1","TEST1","test1",[new Tag("backend")],3),
//     new Note("TEST1","TEST1","test1",[new Tag("cleaning")],4)
//   ]
//   tags:Tag[] = []

//   constructor(){
//     notes.forEach(elem =>()=>{
//       elem.tags.forEach(tag =>()=>{
//         if(!this.tags.includes(tag)){
//           this.tags.push(tag)
//         }
//       })
//     })

//   }

// }

// const noteKeeper = new NoteKeeper();

// console.log(noteKeeper.tags);

var notes = [
  new Note(
    "UXUI",
    "Design landing page",
    "23.03.2022",
    [new Tag("UXUI"), new Tag("QWERTY"), new Tag("Design"), new Tag("Visuals")],
    1
  ),
  new Note("TEST2", "TEST2", "test2", [new Tag("Frontend")], 2),
  new Note("TEST1", "TEST1", "test1", [new Tag("backend")], 3),
  new Note("TEST1", "TEST1", "test1", [new Tag("cleaning")], 4),
];

var tagsArr = [
  new Tag("UXUI", 1),
  new Tag("QWERTY", 2),
  new Tag("Design", 3),
  new Tag("Visuals", 4),
  new Tag("Frontend", 5),
  new Tag("backend", 6),
  new Tag("cleaning", 7),
];
app.use(express.json());

//Note API
app.get("/note/:id", (req: Request, res: Response) => {
  res.send(notes.find((note) => note.id === +req.params.id));
});
app.post("/note", function (req: Request, res: Response) {
  let addedObject = new Note(
    req.body.title,
    req.body.content,
    req.body.createDate,
    req.body.tags
  );
  notes.push(addedObject);
  res.send(`Your object was created at ${addedObject.id}`);
});
app.put("/note/:id", (req: Request, res: Response) => {
  const ChangeIndex = notes.findIndex((note) => note.id == +req.params.id);
  notes[ChangeIndex] = req.body;
  res.send(`Your object was changed to ${JSON.stringify(notes[3])}`);
});
app.delete("/note/:id", (req: Request, res: Response) => {
  const deleteIndex = notes.findIndex((note) => note.id == +req.params.id);
  res.send(`Your object was deleted at ${notes[deleteIndex].id}`);
  notes.splice(deleteIndex, 1);
});
//
//Notes API
app.get("/notes", (req: Request, res: Response) => {
  res.send(notes);
});
//
//TAG API
app.get("/tag/:id", (req: Request, res: Response) => {
  console.log(req.params.id);
  console.log(tagsArr[+req.params.id]);
  res.send(tagsArr.find((Tag) => Tag.id === +req.params.id));
});

app.post("/tag", function (req: Request, res: Response) {
  let addedObject = new Tag(req.body.name);
  tagsArr.push(addedObject);
  res.send(`Your tag was created at ${addedObject.id}`);
});
app.put("/tag/:id", (req: Request, res: Response) => {
  const ChangeIndex = tagsArr.findIndex((Tag) => Tag.id == +req.params.id);
  tagsArr[ChangeIndex] = req.body;
  res.send(`Your object was changed`);
});

app.delete("/tag/:id", (req: Request, res: Response) => {
  const deleteIndex = tagsArr.findIndex((Tag) => Tag.id == +req.params.id);
  res.send(`Your object was deleted at ${tagsArr[deleteIndex].id}`);
  tagsArr.splice(deleteIndex, 1);
});
//Tags API
app.get("/tags", (req: Request, res: Response) => {
  res.send(tagsArr);
});
app.listen(3000);
