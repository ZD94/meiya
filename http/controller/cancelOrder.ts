'use strict';
import {AbstractController, Restful, Router, Reply} from '@jingli/restful'
import {proxyHttp} from '../util'

let config = require("@jingli/config");

let reqs = require('request');

@Restful()
export class CancelController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    @Router("/cancelOrder")
    async other(req, res2, next) {
        let {orderNo, sessionId} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CancelOrder",
            body: {
                orderNo,
                sessionId
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST"
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res2.json(Reply(0, data));
        } else {
            res2.json(Reply(502, data.description));
        }
    }
}

