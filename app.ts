let express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let path = require("path");
let config = require("@jingli/config");

/* logger */
import Logger from "@jingli/logger";

var logger = new Logger('main');

let app = express();
app.use(conn_timeout("15s"));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
app.use(express.static(path.join(__dirname, "www")));

import router from "./http";

app.get("/test", (req, res, next) => {
    console.log("test has been called.");
    res.send("test ok");
});

app.use((req, res, next) => {
    logger.info(req.method, req.url, process.title);
    // let { tmckey } = req.headers;
    // if (tmckey != config.tmckey) {
    //     return res.sendStatus(403);
    // }
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);


    next();
});
app.use(router);



export default app;
