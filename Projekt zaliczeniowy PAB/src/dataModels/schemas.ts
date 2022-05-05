import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    admin: Boolean,
    surname: String,
    password: String,
});

const postSchema = new mongoose.Schema({
    id:Number,
    title:String,
    content:String,
    addedBy: {
        name: String,
        surname: String,
        admin: Boolean,
    },
}, { timestamps: true });

const threadSchema = new mongoose.Schema(
    {
        topic: String,
        description: String,
        posts: [postSchema],
        categories: [String],
        addedBy: {
            name: String,
            surname: String,
            admin: Boolean,
        },
        post_count: Number,
    },
    { timestamps: true }
);
const recipeSchema = new mongoose.Schema({
    //TODO delete id instead use _id from mongo
    id: Number,
    name: String,
    category: [String],
    ingredients: [String],
    steps: [String],
    date: Date,
    reviews: [
        {
            user: String,
            rating: Number,
            likes: Number,
            dislikes: Number,
            content: String,
            date: Date,
        },
    ],
});

//TODO Blog thread schema
//TODO blog post schemas
export const threadModel = mongoose.model("forumThreads", threadSchema);
export const userModel = mongoose.model("users", userSchema);
export const recipeModel = mongoose.model("recipes", recipeSchema);
