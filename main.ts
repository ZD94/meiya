'use strict';

import http = require("http");

require('app-module-path').addPath(__dirname);
import app from "./app";
import config = require("@jingli/config");
import {serverInit, serverStart} from "@jingli/server";
import path = require("path");
import fs = require("fs");

/* redis */
import cache from "@jingli/cache";

cache.init({redis_conf: config.redis.url, prefix: 'tmc:cache:' + config.appName});

/* logger */
import Logger from "@jingli/logger";
import * as cluster from 'cluster';

Logger.init(config.logger);

serverInit({
    name: config.appName,
    workerNumbers: 0,
    entryPath: path.join(__dirname, './handle'),
    cluster: config.cluster,
});

serverStart(function () {
    if(typeof config.socket_file == "number" || /^\d+$/.test(config.socket_file)){
        return;
    }

    if( fs.existsSync(config.socket_file) ){
        fs.unlinkSync(config.socket_file);
    }
});