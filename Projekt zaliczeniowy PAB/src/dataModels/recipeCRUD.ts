import { validateUser } from "../helpers/helperFunctions";
import { Recipe } from "./classes";
import { Response } from "express";
import { recipeModel } from "./schemas";
import { recipeValidator } from "../helpers/JoiValidators";

export default class recipeCRUD {

    async GET(id: string, res: Response) {
        const response = await recipeModel.findById(id);
        if (response == null) return res.status(404).send("Object not found");
        res.status(200).send(response);
    }

    async GET_ALL(res: Response) {
        const response = await recipeModel.find();
        res.status(200).send(response);
    }

    async POST(obj: any, res: Response) {
        
            const {error} = recipeValidator(obj);
            if(error) return res.status(400).send(error.details[0].message);

            try {
                obj.addedBy = res.locals.user;
                const classObj = new Recipe(obj);
                const model = new recipeModel(classObj);
                model.addedBy.user = res.locals.user;
                await model.save();
                res.status(200).send("Recipe saved successfully");
            } catch (err) {
                res.status(400).send("Something went wrong");
            }
        
    }
    async PUT(id: string, obj: any, res: Response) {

        const { error } = recipeValidator(obj);
        if (error) return res.status(400).send(error.details[0].message);


        const before: Recipe | null = await recipeModel.findOne({ id: id });
        
        if (before == null) return res.status(404).send("Object not found");
        if (validateUser(before, res.locals)) {
            await recipeModel.findByIdAndUpdate(before, obj);
            return res.status(200).send("Object succesfully changed");
        } else {
            return res
                .status(403)
                .send("You are not allowed to update this recipe");
        }
    }
    async DELETE(id: string, res: Response) {
        const obj: any = recipeModel.findById(id);
        if (obj == null) return res.status(404).send("Object not found");
        if (validateUser(obj, res.locals)) {
            await recipeModel.deleteOne({ id: id });
            return res.status(200).send("Object succesfully deleted");
        } else
            return res
                .status(403)
                .send("You are not allowed to delete this recipe");
    }
}
