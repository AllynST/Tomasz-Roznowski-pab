import {NoteKeeper} from "./NoteKeeper"
import {Tag} from "./Tag"
import noteKeeper from "./NoteKeeper"

export class Note {
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
      } 
      else {
        this.id = id;
      }
      
      tags.forEach(tag =>{
        if(!noteKeeper.tagsArr.includes(tag)){
          noteKeeper.POST(tag)
        }
      })
  
      this.title = title;
      this.content = content;
      this.createDate = createDate;
      this.tags = tags;
    }
  }
  
  