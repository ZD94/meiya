import http = require("http");
import app from "./app";
import config = require("@jingli/config");

const server = http.createServer(app);

server.listen(config.port, () => {
    console.info("server running");
});

