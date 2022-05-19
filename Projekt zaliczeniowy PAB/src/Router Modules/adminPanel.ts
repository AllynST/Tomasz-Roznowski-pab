import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import dbConnector from "../dataModels/dbConnector";

const express = require("express");
const router = express.Router();

router.use((req: Request, res: Response, next: any) => {
    const header: string = req.headers.authorization!;    
    if (header == undefined) {
        return res.sendStatus(401);
    }
    if (!header.includes("Bearer ")) {
        return res.sendStatus(401);
    }
    const token: string | undefined = header.split(" ")[1];

    jwt.verify(token!, process.env.secret!, (err, user: any) => {
        req.params.user = user;
        if (err) return res.sendStatus(403);

        if (!user.admin)
            return res
                .status(403)
                .send("You don't have access to this command");

        next();
    });

    router.put("/:id", (req: Request, res: Response) => {
        dbConnector.AdminPanel.giveAdmin(+req.params.id, res);
    });
});

export default module.exports = router;
