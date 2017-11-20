/*
 * @Author: Mr.He 
 * @Date: 2017-11-17 18:14:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2017-11-17 18:43:29
 */

import * as http from "http";
import * as path from "path";
import * as config from "@jingli/config";
import app from "../app";
import Logger from "@jingli/logger";
import * as supertest from "supertest";

Logger.init({
    path: path.join(__dirname, "../log"),
    prefix: "mocha_",
    console: false
});
var logger = new Logger('main');

// console.log(config.socket_file, config.port);



let request = supertest(app);

describe("测试开始", () => {
    it("/登录", (done) => {
        request.post("/auth")
            .body({
                username: "",
                password: ""
            })
            .end((err, res) => {
                console.log(res.text);

                console.log("/one okkkkkk");
                done();
            });
    });
});