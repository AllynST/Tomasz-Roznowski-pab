import { IReview } from "../helpers/dataFormats"

export class Recipe{
   
    name:string
    categories:string[]
    ingredients:string[]
    addedBy:User;
    steps:string[]
    
    reviews:IReview[]

    constructor(obj:Recipe){
       
        this.name = obj.name;
        this.categories = obj.categories;
        this.addedBy = obj.addedBy;
        this.ingredients = obj.ingredients;
        this.steps = obj.steps;
         this.reviews = obj.reviews;
    }
}

export class User{
    userName:string;
    name: string
    email:string
    admin:boolean
    surname: string
    password: string

    constructor(user:User){
        this.userName = user.userName;
        this.name = user.name;
        this.email = user.email;
        this.admin = user.admin;
        this.surname = user.surname;
        this.password = user.password;  
           }
}


