import { Recipe } from "./classes";
import { Request, Response } from "express";
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
        obj.addedBy = {
            userName : res.locals.user.userName,
            admin : res.locals.user.admin
        }        
        
        obj.date = new Date().toLocaleString();
        console.log(obj);
        const before: Recipe | null = await recipeModel.findOne({ id: id });
        console.log(before);
        if (before?.reviews == null) {
            before!.reviews == obj;
            recipeModel.findByIdAndUpdate({ id: id }, before!);
            //TODO: zmienić destrukturyzacje na $push
        } else {
            before.reviews = [...before.reviews, obj];
            recipeModel.findOneAndUpdate({ id: id },
                 {before},
                 (err:Error,val:any)=>{
               console.log(err)
            });
        }



        res.send(before);
        //TODO: probably not working
    }

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
