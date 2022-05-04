import { validJSON } from "../helpers/helperFunctions";
import { Recipe } from "./classes";
import { Request, Response } from "express";
import { recipeModel } from "./schemas";

export default class recipeCRUD {

    async GET(id: number, res: Response): Promise<void> {        
        const response = await recipeModel.findOne({ id: id });
        res.send(response);
    }

    async POST(obj: any, res: Response) {
        if (validJSON(obj)) {
            try {
                const classObj = new Recipe(obj);
                const model = new recipeModel(classObj);
                await model.save();
                res.sendStatus(200);
            } catch (err) {
                res.send(err);
            }
        } else res.send("not a valid JSON");
        //TODO update with correct error code
    }
    async PUT(id:number,obj:any, res: Response) {
        //TODO: Guards against invalid input or ID
        const before = await recipeModel.find({ id: id });
        await recipeModel.findByIdAndUpdate(before, obj);
        const test = await recipeModel.findOne({ id: id });
        res.sendStatus(200);
    }
    async DELETE(id:number,res:Response) {
        //TODO: add guards to avoid deleting wrong obj
        //TODO: add response when no obj is found
        await recipeModel.deleteOne({ id: id });
        res.sendStatus(200);
    }
    
}
