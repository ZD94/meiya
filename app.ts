let express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let path = require("path");

let app = express();
app.use(conn_timeout("8s"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
app.use(express.static(path.join(__dirname, "www")));


// require("./db");

import router from "./http";
app.use(router);

export default app;
