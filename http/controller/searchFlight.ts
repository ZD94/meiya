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
        if(query.supplier){
            delete query.supplier;
        }
        console.log(query,"<======query");
        // console.log(auth,"<=====auth");
        let params = {
            url: `${config.meiyaUrl}` + '/QueryFlights',
            body: query,
            header: {
                'content-type': 'application/json'
            },
        };
        let data: any;
        try {
            data = await proxyHttp(params);
            if (data.code == '10000') {
                return res.json(Reply(0, data.flightInfoList) || [] );
            } else {
                return res.json(Reply(502, null));
            }
            // res.json(Reply(0,data))
        } catch (err) {
            console.log(err, '<======err');
            return res.json(Reply(502, null))
        }
    }
}
