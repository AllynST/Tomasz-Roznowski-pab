// import {index} from "./index"

// app.get("/note/:id", (req: Request, res: Response) => {
//     res.send(notes.find((note) => note.id === +req.params.id));
//   });
//   app.post("/note",(req: Request, res: Response)=>{ 
//     res.send(noteKeeper.POST(req.body));
//   });
//   app.put("/note/:id", (req: Request, res: Response) => {
//     const ChangeIndex = notes.findIndex((note) => note.id == +req.params.id);
//     notes[ChangeIndex] = req.body;
//     res.send(`Your object was changed to ${JSON.stringify(notes[3])}`);
//   });
//   app.delete("/note/:id", (req: Request, res: Response) => {
//     const deleteIndex = notes.findIndex((note) => note.id == +req.params.id);
//     res.send(`Your object was deleted at ${notes[deleteIndex].id}`);
//     notes.splice(deleteIndex, 1);
//   });
//   //
//   //Notes API
//   app.get("/notes", (req: Request, res: Response) => {
//     res.send(notes);
//   });