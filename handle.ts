/*
 * @Author: Mr.He 
 * @Date: 2017-11-16 15:35:17 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2017-11-16 15:35:55
 */

import http = require("http");
import config = require("@jingli/config");
import app from "./app";
import fs = require("fs");

/* logger */
import Logger from "@jingli/logger";

var logger = new Logger('main');

const server = http.createServer(app);

let PORT = config.socket_file || config.port;
server.listen(config.socket_file || config.port, (err) => {
    logger.info("server running ,", process.title);
    if (err) {
        process.exit(-1);
        throw err;
    }
    if (!/^\d+$/.test(PORT)) {
        fs.chmodSync(PORT, '777')
    }
});