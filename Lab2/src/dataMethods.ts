import fs from 'fs'

import {User} from './User'
import {Note} from './Note'
import {Tag} from "./Tag"
import mongoose from 'mongoose'

export let notes:Note[] = []
export let tags:Tag[] = []
export let users:User[] = [
  new User("Allyn","zaq1@WSX"),
  new User("Allyn2","zaq1@WSX"),
  new User("Ally3","zaq1@WSX"),
  new User("Allyn4","zaq1@WSX")
];


let dataMethodValue;

(async () => {
    try {
        dataMethodValue = await GetDataMethod();
        dataMethodValue.readData();
        
        console.log("dataMethod chosen")
    } catch (e) {
        console.log("dataMethod selection failed")
        throw new Error("data selection failed")
    }    
    
})();


export interface dataMethod {
    datamethod: string;
    updateStorage(): Promise<void>;
    readData(): Promise<void>;
}

export default dataMethodValue;

class fileSystem implements dataMethod {

    datamethod: string;

    constructor(){
        this.datamethod ="database"
    }
    
    async updateStorage() {
        await fs.promises.writeFile("./src/data/notes.json",'utf-8');
        await fs.promises.writeFile("./src/data/tags.json",'utf-8');
        await fs.promises.writeFile("./src/data/users.json",'utf-8');
        
    }
    async readData() {
        notes = JSON.parse(await fs.promises.readFile("./src/data/notes.json",'utf-8'))
        tags = JSON.parse(await fs.promises.readFile("./src/data/tags.json",'utf-8'))
        users = JSON.parse(await fs.promises.readFile("./src/data/users.json",'utf-8'))
        console.log("data loading finished")
        
    }

}

class database implements dataMethod {

    datamethod: string

    constructor(){
        this.datamethod ="database"
        this.loadConfig()
        
    }
    

    async loadConfig(){
        const config = await JSON.parse(await fs.promises.readFile("./src/config.json",'utf-8'))
        try{
            const db = await mongoose.connect(config.conString)
        }
        catch(err){
            throw new Error("db connect failed")
        }
        finally{
            console.log("database connected")
        }        

        console.log("conString");
    }

    async updateStorage() {
    
        
    }
    async readData() {
        try{
            throw new Error('Method not implemented.');
        }
        catch(err){

        }
        
    }

}



export async function GetDataMethod():Promise<dataMethod>{
    const config = await JSON.parse(await fs.promises.readFile("./src/config.json",'utf-8'))
    return config.dataMethod === "fileSystem"  ? new fileSystem() : new database()
   
}

const noteSchema = new mongoose.Schema({
    
    title: String,
    content: String,
    createDate: String,
    visible :Boolean,
    author:String,
    tags: [String]
},{
    timestamps:true
})

const tagSchema = new mongoose.Schema({
    id: String,
    name: String
})

const userSchema = new mongoose.Schema({
    id: String,
    userName:String,    
    password:String,
    token:String
})


export const noteModel = mongoose.model('notes', noteSchema)
export const tagModel = mongoose.model('tags', tagSchema)
export const userModel = mongoose.model('users', userSchema)

