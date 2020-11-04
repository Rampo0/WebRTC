import express, {Request , Response} from "express";

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

const router = express.Router();

router.get("/:room", async (req : Request , res : Response) => {
    res.render("index", {roomId : req.params.room});
})

app.use(router);

export { app };
