import mongoose from "mongoose";


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
        addedBy:{
            type:{
                userName:String,
                admin:Boolean
            },
            required:true
        },
        description:{
            type:String,
            required:true

        },
        posts:{ 
            type : [postSchema],
            default: []
        },
        archived:{
            default:false,
            type:Boolean
        },
        categories: [String],
        post_count:{
            type:Number,
            default:0
        },
    },
    { timestamps: true }
);
const recipeSchema = new mongoose.Schema(
    {
        name: String,
        addedBy: {
            userName: String,
            admin: Boolean,
        },
        categories: [String],
        ingredients: [String],
        steps: [String],
        reviews: [
            {
                userName: String,
                rating:{type:Number,default:0},
                likes: { type: Number, default: 0 },
                dislikes: { type: Number, default: 0 },
                content:{
                    type:String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


export const threadModel = mongoose.model("forumThreads", threadSchema);
export const userModel = mongoose.model("users", userSchema);
export const recipeModel = mongoose.model("recipes", recipeSchema);


