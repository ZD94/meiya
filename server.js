

'use strict';

//可以直接require服务器根目录下的模块
require('app-module-path').addPath(__dirname);
require("ts-node").register({});
require("./main");


