import express, {Request , Response} from "express";
import { createServer } from "http";
import { Socket } from "socket.io";

const app = express();
const http = createServer(app);

const io = require("socket.io")(http);

io.on("connection", (socket : Socket) => {
    console.log("user connected to socket.io");
    
    socket.on("join-room", (roomId, userId) => {
        console.log(userId + " joined room : " + roomId);
        // tell everybody someone join that room
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("new-user-join", userId);
        // ---

        socket.on("disconnect", () => {
            console.log("user disconnected from socket.io");
            socket.to(roomId).broadcast.emit("user-disconnected", userId);
        })

        socket.on("chat", msg => {
            console.log("message received :", msg);
            socket.to(roomId).broadcast.emit("chat-message", msg);
        })
    });
});

export { http as socketServer };
