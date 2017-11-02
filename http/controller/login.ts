/**
 * Created by hxs on 2017/10/31.
 */

'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config")
let reqs = require('request');


@Restful()
export class AuthController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    @Router("/login")
    async other(req, res2, next) {
        let {userName, password} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + '/Login',
            body: {
                userName,
                password,
                "passwordType": "3"
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST"
        };
        let data = await proxyHttp(params);
        res2.json(Reply(0, data));
    }
}

