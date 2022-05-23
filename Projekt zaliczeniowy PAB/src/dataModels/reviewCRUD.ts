import { Recipe } from "./classes";
import {Response } from "express";
import { recipeModel } from "./schemas";
import { validateUser } from "../helpers/helperFunctions";

export default class reviewCRUD {
    async GET(id: number, res: Response) {
        console.log(id);
        //given the id of the recipe return a array of reviews
        const obj: Recipe | null = await recipeModel.findOne({ id: id });
        console.log(obj);
        if (obj == null) {
            res.send("recipe not found");
        } else res.send(obj.reviews);
    }

    async POST(id: number, obj: any, res: Response) {
        
        if(obj.content == null) return res.status(412).send("Review message not provided")
        //TODO add check if recipe is not found
        const signedContent = {
            userName : res.locals.user.userName,
            content:obj.content,
        }       
              
            recipeModel.findOneAndUpdate({ id: id },
                 {$push:{ reviews:signedContent }},
                 (err:Error,val:any)=>{
                if(err) res.status(404).send("Thread not found or review message not provided");
                else{
                    res.status(200).send("Review added successfully")
                }
            });     
    }
    //TODO add like endpoint find with both ids in one*
    //TODO add dislike endpoint

    async DELETE(recipeID: string, reviewID: string, res: Response) {
    
        const threadExists = await recipeModel.findById(recipeID);

        const index = threadExists.reviews.findIndex(
            (r: any) => r.reviewId === reviewID
        );
        const reviewCheck = threadExists.reviews[index];
        if (threadExists == null || reviewCheck == null) {
            return res.status(404).send("No review found with provided data");
        }

        if (validateUser(threadExists.addedBy, res.locals)) {
            const result = await recipeModel
                .findByIdAndUpdate(
                    { _id: recipeID },
                    {
                        $pull: {
                            reviews: {
                                _id: reviewID,
                            },
                        },
                    },
                    (err: Error, val: any) => {
                        if (err) {
                            return res
                                .status(404)
                                .send("Internal server error");
                        } else {
                            const index = val.reviews.findIndex(
                                (r: any) => r.reviewId === reviewID
                            );
                            const deletedCheck = val.reviews[index];

                            
                            if (deletedCheck == undefined) {
                                return res
                                    .status(200)
                                    .send("Review deleted successfully");
                            }
                        }
                    }
                )
                .clone();
        } else {
            return res
                .status(403)
                .send("You dont have permission to delete this review");
        }
    }
}
