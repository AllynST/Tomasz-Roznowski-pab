import { Note } from "./Note"


export class User{
    id?:number;
    notes?:Note[] = [];
    userName:string;
    password:string;
    token?:string;

    constructor(userName:string,password:string,token:string){
        this.id = Date.now();
        this.userName = userName;
        this.password = password;        
        this.token = token;
              
        
        
    }

}