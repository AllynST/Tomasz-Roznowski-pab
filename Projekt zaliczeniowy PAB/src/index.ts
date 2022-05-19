import "dotenv/config";
import express from "express";

const app = express();

import recipeAPI from "./Router Modules/recipe";
import reviewAPI from "./Router Modules/review";
import userAPI from "./Router Modules/user";
import threadAPI from "./Router Modules/forumThreads";
import postAPI from "./Router Modules/forumPosts";
import adminAPI from "./Router Modules/adminPanel";

if (process.env.secret == undefined) {
    throw new Error("No secret found");
}

if (process.env.dbConString == undefined) {
    throw new Error("No database connection string found");
}

//TODO make forum threads and posts work with websocket


//TODO delete websocket template
//WEB SOCKET
// const server = http.createServer(app);
// const wsServer = new ws.Server({ server: server });

// wsServer.on("connection", (socket: ws) => {
//     console.log("new connection");
//     socket.on("message", (msg) => {
//         console.log(`New message:${msg}`);
//         wsServer.clients.forEach((client: ws) => {
//             client.send(`new message${msg}`);
//         });
//     });
//     //socket.send('hello you')
// });


// server.listen(3001);

app.use(express.json());

app.use("/recipe", recipeAPI);
app.use("/review", reviewAPI);
app.use("/user", userAPI);
app.use("/forum/thread", threadAPI);
app.use("/forum/post", postAPI);
app.use("/admin", adminAPI)


app.listen(3000);
console.log("App running waiting for Database connection");
