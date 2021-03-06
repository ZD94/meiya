let express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let path = require("path");
let config = require("@jingli/config");
let moment = require("moment");

/* logger */
import Logger from "@jingli/logger";
var logger = new Logger('main');

let app = express();


app.use(conn_timeout("30s"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '8mb' }));


app.use(express.static(path.join(__dirname, "www")));

import router from "./http";

app.get("/test", (req, res, next) => {
    console.log("test has been called.");
    console.log(req.query);
    console.log(req.body);
    logger.info(req.query);
    logger.info(req.body);
    res.send("test ok");
});

app.use((req, res, next) => {
    // let { tmckey } = req.headers;
    // if (tmckey != config.tmckey) {
    //     return res.sendStatus(403);
    // }

    console.log("****************** ENTER  *****************")
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    logger.info(moment().format("YYYY-MM-DD hh:mm:ss"),"  ", req.method, req.url);
    next();
});

app.use(usingTime);
app.use(router);

function usingTime(req, res, next){
    req.enterTime = Date.now();
    res.json = function(data){
        res.setHeader('Content-Type', 'application/json');
        
        try{
            data = JSON.stringify(data);
        }catch(e){}
        res.write(data);
        logger.info(req.method, req.url, process.title, (Date.now() - req.enterTime) / 1000, "s");
        res.end();
    }

    next();
}

export default app;
