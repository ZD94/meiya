'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require('request');

@Restful()
export class CheckController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true
    }

    @Router('/checkPrice')
    async other(req, res2, next) {
        let {sessionId, orderNo} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CheckPrice",
            body: {
                orderNo,
                sessionId
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST"
        };
        let data = await proxyHttp(params);

        res2.json(Reply(0, data))
    }
}