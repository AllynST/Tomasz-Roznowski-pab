import mongoose from "mongoose";
//TODO ADD VALIDATION

const userSchema = new mongoose.Schema({
    userName:String,
    name: String,
    email: String,
    admin: Boolean,
    surname: String,
    password: String,
},{
    timestamps: true    
});

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addedBy: {
        userName: String,
        admin: Boolean,
    },
}, { timestamps: true });

const threadSchema = new mongoose.Schema(
    {
        topic:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true

        },
        posts: [postSchema],
        categories: [String],
        addedBy: {
            userName: String,
            admin: Boolean,
        },
        post_count: Number,
    },
    { timestamps: true }
);
const recipeSchema = new mongoose.Schema({
    name: String,
    addedBy:{
        userName: String,
        admin: Boolean
    },
    categories: [String],
    ingredients: [String],
    steps: [String],    
    reviews: [        
        {
            userName: String,
            rating: Number,
            likes: Number,
            dislikes: Number,
            content: String,
            date: Date,
        },
    ],
},{
    timestamps:true
});

export const threadModel = mongoose.model("forumThreads", threadSchema);
export const userModel = mongoose.model("users", userSchema);
export const recipeModel = mongoose.model("recipes", recipeSchema);


