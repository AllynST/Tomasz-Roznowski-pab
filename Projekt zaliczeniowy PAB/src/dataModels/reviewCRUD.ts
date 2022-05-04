import { Recipe } from "./classes";
import { Request, Response } from "express";
import { recipeModel } from "./schemas";


export default class reviewCRUD {
    async GET(id: number, res: Response) {
        //given the id of the recipe return a array of reviews
        const obj: Recipe | null = await recipeModel.findOne({ id: id });

        if (obj == null) {
            res.send("recipe not found");
        } else res.send(obj.reviews);
    }
    async POST(id: number, obj: any, res: Response) {
        console.log(obj);
        const before: Recipe | null = await recipeModel.findOne({ id: id });
        console.log(before);
        if (before?.reviews == null) {
            before!.reviews == obj;
            recipeModel.findByIdAndUpdate({ id: id }, before!);
            //TODO: specjalna funkcja z $ push
        } else {
            before.reviews = [...before.reviews, obj];
            recipeModel.findByIdAndUpdate({ id: id }, before);
        }

        res.send(before);
        //TODO: probably not working
    }
    async PUT() {
        throw new Error("this method musn't be called");
    }
    async DELETE(recipeID: number, reviewID: number, res: Response) {
        const obj = await recipeModel.findOne({ id: recipeID });
        const delIndex = obj.reviews.findIndex(
            (review: { _id: number }) => review._id === reviewID
        );
        const updated = obj.reviews.splice(delIndex, 1);
        recipeModel.findByIdAndUpdate({ id: recipeID }, updated);
        res.sendStatus(400);
    }
}
