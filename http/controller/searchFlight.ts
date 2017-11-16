'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../util'
import {searchFlight} from "model/search"

let config = require("@jingli/config");

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
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        let data: any;
        try {
            data = await searchFlight(query);
            console.log(data,'<============searchFlightData');
            res.json(data)
        } catch (err) {
            console.log(err, '<======err');
        }
    }
}


