/**
 * Created by wlh on 2017/11/2.
 */
'use strict';
const path = require("path");
const fs = require("fs");

let currentDir = __dirname;

require("ts-node").register({});
loadTest(__dirname);

function loadTest(dir) {
    let files = fs.readdirSync(dir);
    for (let f of files) {
        let fullPath = path.join(dir, f);
        let stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            return loadTest(fullPath);
        }

        if (!/\.(js|ts)$/.test(f)) {
            continue;
        }
        // let relativePath = path.relative(currentDir, fullPath);
        // relativePath = relativePath.replace(/\.(ts|js)$/, '');
        // console.log(relativePath)
        require(fullPath);
    }
}
