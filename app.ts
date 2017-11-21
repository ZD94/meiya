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

app.use("/", (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    if (req.method == 'OPTIONS') {
        return res.send("OK");
    }

    next();
});

app.use(router);

app.get("/test", (req, res, next) => {
    console.log("test has been called.");
    res.send("test ok");
});

export default app;
