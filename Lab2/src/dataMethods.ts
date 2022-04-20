import fs from 'fs'


import {User} from './User'
import {Note} from './Note'
import {Tag} from "./Tag"

export let notes:Note[] = []
export let tags:Tag[] = []
export let users:User[] = [
  new User("Allyn","zaq1@WSX"),
  new User("Allyn2","zaq1@WSX"),
  new User("Ally3","zaq1@WSX"),
  new User("Allyn4","zaq1@WSX"),
]


interface dataMethod {
    updateStorage(): Promise<void>;
    readData(): Promise<void>;
}



class fileSystem implements dataMethod {
    async updateStorage() {
        await fs.promises.writeFile("./data/notes.json",'utf-8');
        await fs.promises.writeFile("./data/tags.json",'utf-8');
        await fs.promises.writeFile("./data/users.json",'utf-8');
        
    }
    async readData() {
        notes = JSON.parse(await fs.promises.readFile("./data/notes.json",'utf-8'))
        tags = JSON.parse(await fs.promises.readFile("./data/tags.json",'utf-8'))
        users = JSON.parse(await fs.promises.readFile("./data/users.json",'utf-8'))
    }

}

// class database implements dataMethod {
//     updateStorage() {
//         throw new Error('Method not implemented.');
//     }
//     readData() {
//         throw new Error('Method not implemented.');
//     }

// }

