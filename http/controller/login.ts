/**
 * Created by hxs on 2017/10/31.
 */

'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require('request');


@Restful()
export class AuthController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async add(req, res, next) {
        let {userName,password} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + '/Login',
            body: {
                userName,
                password,
                "passwordType":"3"
            },
            header: {
                'content-type': 'application/json'
            },
            method:"POST"
        };

        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            let sessionId = {
                sessionId:data.sessionId
            };
            res.json(Reply(0, sessionId));
        } else {
            res.json(Reply(502, null));
        }
    }
}


