import { Note } from "./Note"


export class User{

    id?:number;
    userName:string;
    password:string;
    token?:string;
    

    constructor(userName:string,password:string,token?:string){
        this.id = Date.now();
        this.userName = userName;
        this.password = password;        
        this.token = token;         
        
        
    }

    setToken(entrToken:string){
        this.token = entrToken
    }

    tokenValid(entrToken:string){
        return entrToken != this.token ?  false : true
    }

}