export interface IUser{

    name: String,
    email: String,
    admin: Boolean,
    surname: String,
    password: String,
    date: Date,
};


export interface IReview {
    user: string;
    
    //Rating ==  (0,5)
    rating: number;
    likes: number;
    dislikes: number;
    content: string;
    date: Date;
}
