import { notStrictEqual } from 'assert';
import { create } from 'domain'
import express from 'express'
import {Request, Response} from 'express'

const app = express()

const date = new Date();

interface INote{
  id:number,
  title:string,
  content:string,
  createDate:string,
  tags:string[],
}


class Note implements INote{
   
  id:number
  title:string
  content:string
  createDate:string
  tags:string[]

  constructor(title:string,content:string,createDate:string,tags:string[],id?:number){
    if(id ===undefined){
      this.id = Date.now()
    }
    else{
      this.id = id
    }

    
    this.title = title
    this.content = content
    this.createDate = createDate
    this.tags = tags
  }
}

var notes = [
  new Note("TEST1","TEST1","test1",["test1"],1),
  new Note("TEST2","TEST2","test2",["test2"],2),
  new Note("TEST1","TEST1","test1",["test1"],3),
  new Note("TEST1","TEST1","test1",["test1"],4),
]
app.use(express.json())
console.log(notes[0].id);

app.get('/notes/:id', (req: Request, res: Response)=> {
  
  res.send(notes.find(note=> note.id === +req.params.id))

})

app.post('/notes', function (req: Request, res: Response) {

  let addedObject = new Note(req.body.title,req.body.content,req.body.createDate,req.body.tags) 
  notes.push(addedObject)  
  res.send(`Your object was created at ${addedObject.id}`)
})
app.put('/notes/:id',(req:Request,res:Response)=>{

  const ChangeIndex = notes.findIndex( note => note.id == +req.params.id)
  notes[ChangeIndex] = req.body;
  res.send(`Your object was changed to ${JSON.stringify(notes[3])}`)
})

app.delete('/notes/:id',(req:Request,res:Response)=>{

  const deleteIndex = notes.findIndex( note => note.id == +req.params.id)
  res.send(`Your object was deleted at ${notes[deleteIndex].id}`)
  notes.splice(deleteIndex,1)
  
  
})

app.listen(3000)


