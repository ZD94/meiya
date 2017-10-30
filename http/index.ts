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

// let allowOrigin = [
//     "localhost",
//     "jingli365"
// ];

// function checkOrigin( origin ){
//     for(let item of allowOrigin){
//         if(origin.indexOf(item) > -1){
//             return true;
//         }
//     }

//     return false;
// }

// function allowCrossDomain(req, res, next) { 
//     if (req.headers.origin && checkOrigin(req.headers.origin)) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//     }
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//     if (req.method == 'OPTIONS') {
//         return res.send("OK");
//     }
//     next();
// }

// function validCompanyId(req, res, next, companyId) { 
//         if (!companyId) {
//             return next();
//         }

//         /* let { accountId } = req["session"];
        
//         //如果存在companyId参数，验证companyId是否属于该accountId
//         let companyCheck = await checkCompany(accountId , value);
//         if(!companyCheck){
//             return res.json(Reply(403, null));
//         } */
//         next();
// }

export async function initHttp(app) {
    app.use("/", (req, res, next)=>{
        console.log(req.url);
        next();
    });
    app.use(router);
}