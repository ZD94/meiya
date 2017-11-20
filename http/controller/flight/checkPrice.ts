'use strict';
import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {proxyHttp} from '../../util'

let config = require("@jingli/config");

@Restful()
export class CheckController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true
    }

    @Router('/checkPrice')
    async other(req, res, next) {
        let {sessionId, orderNo} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CheckPrice",
            body: {},
            header: {
                'content-type': 'application/json'
            },
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(reply(0, data));
        } else {
            res.json(reply(502, null));
        }
    }
}
