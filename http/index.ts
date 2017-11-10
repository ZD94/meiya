/**
 * Created by hxs on 2017/10/30.
 */

'use strict';

import http = require("http");

import {scannerDecoration, registerControllerToRouter, Reply} from "@jingli/restful";

import path = require("path");
let express = require("express");

let router = express.Router();

scannerDecoration(path.join(__dirname, 'controller'));
registerControllerToRouter(router);

export default router