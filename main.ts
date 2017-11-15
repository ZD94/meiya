import http = require("http");
import app from "./app";
import config = require("@jingli/config");


/* redis */
import cache from "@jingli/cache";
let config = require("@jingli/config");
cache.init({ redis_conf: config.redis.url, prefix: 'tmc:cache:' + config.appName });



const server = http.createServer(app);

server.listen(config.port, () => {
    console.info("server running");
});

