import { app } from "./app";
import { socketServer } from "./socket-server";

const start = async () => {
    app.listen(3000, () => {
        console.log("Listening to port 3000")
    });

    socketServer.listen(3002, () => {
        console.log("Listening on port 3002");
    });
}

start();