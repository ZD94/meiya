/**
 * Created by hxs on 2017/10/30.
 */

'use strict';

import http = require("http");

import {scannerDecoration, registerControllerToRouter, Reply} from "@jingli/restful";

import path = require("path");
import express = require("express");

let router = express.Router();

scannerDecoration(path.join(__dirname, 'controller'));
registerControllerToRouter(router);

import {Model} from "db";
let uuid = require("uuid");

export async function initHttp(app) {
    app.use(router);
    app.get("/go", async (req, res, next)=>{
        let data = await Model.tmc.build({
            id:uuid.v1(),
            userId:uuid.v4(),
            tmcName:"what",
            identity:{"username":"goodMan", "password":"password123"}
        }).save();
        res.json({
            msg:"ok",
            data
        });
    });
}