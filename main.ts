'use strict';

import http = require("http");
require('app-module-path').addPath(__dirname);
import app from "./app";
import config = require("@jingli/config");
import { serverInit, serverStart } from "@jingli/server";
import path = require("path");

/* redis */
import cache from "@jingli/cache";
cache.init({ redis_conf: config.redis.url, prefix: 'tmc:cache:' + config.appName });

import Logger from "@jingli/logger";
import * as cluster from 'cluster';
Logger.init(config.logger);

serverInit({
    name: config.appName,
    workerNumbers: 0,
    entryPath: path.join(__dirname, './handle'),
    cluster: config.cluster,
});

serverStart();