import {Tag} from "./Tag"
import fs from "fs"
import {Note} from "./Note"

export class NoteKeeper{

    notesArr:Note[] = []    
    tagsArr:Tag[] = []
  
    constructor(){    
      this.readStorage();      
    }
      
    private async readStorage(): Promise<void> {
      try {
          this.notesArr = JSON.parse(await fs.promises.readFile("src/data/notes.json", 'utf-8'));
          this.tagsArr = JSON.parse(await fs.promises.readFile("src/data/tags.json", 'utf-8'));
      } catch (err) {
          console.log(err)
      }
    }
  
    private async updateStorage(): Promise<void> {
      try {
          await fs.promises.writeFile("src/data/notes.json", JSON.stringify(this.notesArr));
          await fs.promises.writeFile("src/data/tags.json", JSON.stringify(this.tagsArr));
      } catch (err) {
          console.log(err)
      }
    }  
  
    getTagsList(){
      return this.tagsArr
    }

    GET(obj:string,id:number){
      if(obj === "note"){        
        const obj = this.notesArr.find((note) => note.id === id)
        return obj    
      }
      else if(obj === "tag"){
        const obj = this.tagsArr.find((tag) => tag.id === id)
        return obj        
      }
    }
  
    POST(obj:any){
      if(obj instanceof Note){
        this.notesArr.push(obj)
        this.updateStorage();
        return(`${obj} added`)
      }
      else if(obj instanceof Tag){
        this.tagsArr.push(obj)
        this.updateStorage();
        return(`${obj} added`)
      }
      else{
        return("Invalid object")
      }
    }
  
    DELETE(obj:string,id:number){
      if(obj === "note"){
        
        this.notesArr.splice(this.notesArr.findIndex(obj => obj.id === id),1)
        this.updateStorage();
        return `Your note was deleted at id:${id}`      
      }
      else if(obj === "tag"){
        this.tagsArr.splice(this.tagsArr.findIndex(obj => obj.id === id),1)
        this.updateStorage();
        return `Your tag was deleted at id:${id}`    
      }
      else{
        return(`There is no object with id:${id}`)
      }

      
    }
    PUT(obj :any, id:number){
      if(obj instanceof Note){
        const ChangeIndex = this.notesArr.findIndex((Note) => Note.id == id);
        this.notesArr[ChangeIndex] = obj;
        this.updateStorage();
        return `Your object has been changed to ${JSON.stringify(obj)}`
      }
      else if(obj instanceof Tag){
        const ChangeIndex = this.tagsArr.findIndex((Tag) => Tag.id == id);
        this.tagsArr[ChangeIndex] = obj;
        this.updateStorage();
        return `Your object has been changed to ${JSON.stringify(obj)}`
      }
      else{
        return "You cant alter that object"
      }
    } 
  
  
  }

  