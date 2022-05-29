import "dotenv/config";
import express from "express";
var cron = require("node-cron");

const app = express();

import recipeAPI from "./Router Modules/recipe";
import reviewAPI from "./Router Modules/review";
import userAPI from "./Router Modules/user";
import threadAPI from "./Router Modules/forumThreads";
import postAPI from "./Router Modules/forumPosts";
import adminAPI from "./Router Modules/adminPanel";
import { archiveRoutine } from "./helpers/helperFunctions";

if (process.env.secret == undefined) {
    throw new Error("No secret found");
}

if (process.env.dbConString == undefined) {
    throw new Error("No database connection string found");
}

//Running maintanance 
//Every day at 2:30 look for threads with last post older then 7 days and archive the thread
cron.schedule("30 2 * * *", async () => {
  const num = await archiveRoutine();
  console.log("Thread maintanance finished")
  console.log(`${num} threads archived`)
});

app.use(express.json());

app.use("/recipe", recipeAPI);
app.use("/review", reviewAPI);
app.use("/user", userAPI);
app.use("/forum/thread", threadAPI);
app.use("/forum/post", postAPI);
app.use("/admin", adminAPI)


app.listen(3000);
console.log("App running waiting for Database connection");
