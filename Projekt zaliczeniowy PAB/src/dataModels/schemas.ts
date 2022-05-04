import { timeStamp } from "console"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    admin:Boolean,
    surname: String,
    password: String,
})
const recipeSchema = new mongoose.Schema({
    id:Number,
    name: String,
    category: [String],
    ingredients: [String],
    steps: [String],
    date:Date,
    reviews: [{
        user: String,
        rating:Number,
        likes: Number,
        dislikes: Number,
        content: String,
        date:Date
    }]
})

//TODO Blog thread schema
//TODO blog post schemas

export const userModel = mongoose.model('users',userSchema)
export const recipeModel = mongoose.model('recipes',recipeSchema)
