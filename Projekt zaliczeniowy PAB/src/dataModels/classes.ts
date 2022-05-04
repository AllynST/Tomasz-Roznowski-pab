import { IReview } from "../helpers/dataFormats"

export class Recipe{
    id:number
    name:string
    category:string[]
    ingredients:string[]
    steps:string[]
    date:Date
    reviews:IReview[]

    constructor(obj:Recipe){
        this.id = obj.id;
        this.name = obj.name;
        this.category = obj.category;
        this.ingredients = obj.ingredients;
        this.steps = obj.steps;
        this.date = obj.date;
        this.reviews = obj.reviews;
    }
}

export class User{
    name: string
    email:string
    admin:boolean
    surname: string
    password: string

    constructor(user:User){
        this.name = user.name;
        this.email = user.email;
        this.admin = user.admin;
        this.surname = user.surname;
        this.password = user.password;  
           }
}


