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

  constructor(title:string,content:string,createDate:string,tags:string[]){
    this.id = Date.now()
    this.title = title
    this.content = content
    this.createDate = createDate
    this.tags = tags
  }
  

}

let notes = [
  new Note("TEST","TEST","test",["test2"]),
]

app.use(express.json())

app.get('/notes/:id', function (req: Request, res: Response) {

  let id = parseInt(req.params.id)
 

  res.send(notes.find(note=> note.id === id))

})

app.post('/notes', function (req: Request, res: Response) {
  

  let addedObject = new Note(req.body.title,req.body.content,req.body.createDate,req.body.tags)
  notes.push(addedObject)  
  res.sendStatus(200).send(`Your object was created at ${addedObject.id}`)
})
app.put('/notes/:id',(req:Request,res:Response)=>{
    
})
app.put('/notes/:id',(req:Request,res:Response)=>{
  for(let i in notes){
    
  }
})

app.listen(3000)


