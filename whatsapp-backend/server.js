import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());


// DB config
const connection_url = "mongodb+srv://admin:@cluster0.nxrkumi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get("/messages/sync", async (req, res) => {
    try {
        const messages = await Messages.find();
        res.status(200).send(messages);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.post('/messages/new', async (req, res) => {
    const dbMessage = req.body;

    try {
        const message = await Messages.create(dbMessage);
        res.status(201).send(message);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));