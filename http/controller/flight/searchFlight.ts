'use strict';
import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../../util'
import {searchFlight} from "model/flight/search"

let md5 = require("md5");
let config = require("@jingli/config");
import cache from "@jingli/cache"

@Restful()
export class SearchFlightController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async $before(req, res, next) {
        let {username, password} = req.headers;
        if (!username || !password) {
            return res.json(reply(500, null));
        }
        let key = md5(username + password);
        let sessionId = await cache.read(key);
        if (req.method == "GET") {
            req.query.sessionId = sessionId["sessionId"]
        } else {
            req.body.sessionId = sessionId["sessionId"]
        }
        next()
    }

    async find(req, res, next) {
        // let query = req.query;
        let data: any;
        try {
            data = await searchFlight(req);
            res.json(data)
        } catch (err) {
            console.log(err);
        }
    }
}

