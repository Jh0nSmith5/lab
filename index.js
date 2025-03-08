import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app= express();
const port= 3000;
let authorize = false;

app.use(bodyParser.urlencoded({extended: true}));

function passwordCheck (req, res, next) {
    authorize = false;
    let password = req.body["password"];
    if (password === "285") {
        authorize = true;
        
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.post("/check", (req, res) => {
    if (authorize) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});