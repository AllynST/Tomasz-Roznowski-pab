// import dotenv from "dotenv"

// dotenv.config({
//     path: "C:Users\tomasDesktopProjekt zaliczeniowy PABsrc.env",
// });
import express from "express";

const app = express();

// setTimeout(() => {
//     console.log(process.env);
// }, 3000);

export const secret = "ICANNOTDOANENVFILE0239580293850293580293852039580298531"

import recipeAPI from "./Router Modules/recipe";
import reviewAPI from "./Router Modules/review";
import userAPI from "./Router Modules/user";
import forumAPI from './Router Modules/forum'

// if (process.env.secret == undefined) {
//     throw new Error("No secret found");
// }

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

//TODO: create inv file with constring(gitIgnore)
//TODO: dotenv

// server.listen(3001);

app.use(express.json());

app.use("/recipe", recipeAPI);
app.use("/review", reviewAPI);
app.use("/user", userAPI);
app.use("/forum", forumAPI);
//TODO: dodać endpointy z routerów

app.listen(3000);
console.log("app ready");
