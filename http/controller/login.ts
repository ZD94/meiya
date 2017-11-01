/**
 * Created by hxs on 2017/10/31.
 */

'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let reqs = require('request');
// import {Login} from "http/interface";

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
        let params = {
            url: 'http://121.41.36.97:6005/API.svc/Login',
            body: {
                "userName": "JingLiZhiXiang",
                "password": '123456',
                "passwordType": "3"
            },
            header: {
                'content-type': 'application/json'
            },
            method:"POST"
        };
        let data = await proxyHttp(params);
        console.log('data.sessionId======>',data,'<====data.sessionId');
        if(data)  data = JSON.stringify(data);
        res2.json(Reply(0, {msg: `${data}`}));
    }
}

