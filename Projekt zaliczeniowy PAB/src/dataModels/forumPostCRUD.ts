import { Response } from "express";
import { threadModel } from "./schemas";

export default class forumPostCRUD {
    //FIXME fix this entire section

    async POST(threadID: string, obj: any, res: Response) {
        //TODO ADD ID CHECK

        const result = await threadModel.findById(threadID);
        result.posts = [...result.posts, obj];
        let error: Error;
        result
            .save()

            .catch((err: Error) => {
                error = err;
                return res
                    .status(404)
                    .send("Cannot modify obj with provided data");
            })
            .then(() => {
                if (!error) return res.status(200).send("Post added");
            });
    }
    async PUT(threadID: number, postID: Number, obj: any, res: Response) {
        const result = await threadModel.findOne({ _id: threadID });
        if (result.acknowledged) {
            const index = result.posts.findIndex(
                (post: any) => post.id === postID
            );
            if (index !== -1) {
                result.posts[index] = obj;
                result.save();
                return res.status(200).send("Object succesfully altered");
            } else {
                return res.status(404).send("Provided post id doesnt exist");
            }
        } else {
            return res.status(404).send("Provided thread id doesnt exist");
        }
    }
    async DELETE(threadID: string, postID: string, res: Response) {
        try {
            const result = await threadModel.findById(threadID);
            if (!result)
                return res
                    .status(404)
                    .send("Thread with provided data doesnt exist");
            const test = result.posts.findIndex((x: any) => x.id == postID);
            if (test == -1)
                return res
                    .status(404)
                    .send("Post with provided data doesnt exist");
            let error: Error;
            result.posts.pull(postID);
            result
                .save()
                .catch((err: Error) => {
                    console.log(err.message);
                    error = err;
                })
                .then(() => {
                    if (!error) res.status(200).send("object deleted");
                });
        } catch (err) {
            return res
                .status(412)
                .send("Provided data did not match the template");
        }
    }
}
