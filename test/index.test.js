/*
 * @Author: Mr.He 
 * @Date: 2017-11-17 17:44:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2017-11-17 18:08:20
 */

let path = require("path");
require("ts-node").register({});
require('app-module-path').addPath(path.join(__dirname, "../"));

require("./main");