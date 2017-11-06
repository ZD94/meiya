'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");

let reqs = require('request');

@Restful()
export class SearchFlightController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async find(req, res, next) {
        let query = req.query;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;
        let params = {
            url: `${config.meiyaUrl}` + '/QueryFlights',
            body: query,
            header: {
                'content-type': 'application/json'
            },
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }

}
