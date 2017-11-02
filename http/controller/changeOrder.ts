'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config")
let reqs = require("request");

@Restful()
export class ChangeController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    @Router('/changeOrder')
    async other(req, res2, next) {
        let {sessionId} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CreateChangeOrder",
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            body: {}
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res2.json(Reply(0, data));
        } else {
            res2.json(Reply(502, data.description));
        }
    }
}
