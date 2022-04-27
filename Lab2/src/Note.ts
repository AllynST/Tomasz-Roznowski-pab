
import {Tag} from "./Tag"

export class Note {
    id: number;
    title: string;
    content: string;
    createDate: string;
    visible :boolean;
    author:string
    tags: Tag[];
  
    constructor(
      title: string,
      content: string,
      createDate: string,
      visible:boolean,
      author:string,
      tags: Tag[],
      id?: number
    ) {
      if (id === undefined) {
        this.id = Date.now();
      } 
      else {
        this.id = id;
      }
      
      // tags.forEach(tag =>{
      //   if(!noteKeeper.tagsArr.includes(tag)){
      //     noteKeeper.POST(tag)
      //   }
      // })
  
      this.title = title;
      this.content = content;
      this.createDate = createDate;
      this.tags = tags;
      this.author = author;
      this.visible = visible;
    }
  }
  
  