let express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();
app.use(conn_timeout("10s"));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
app.use(express.static(path.join(__dirname, "www")));

import router from "./http";
app.use(router);

app.get("/test", (req, res, next) => {
    console.log("test has been called.");
    res.send("test ok");
});

export default app;
