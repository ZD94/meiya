'use strict';
import { AbstractController, Restful, Router, reply } from "@jingli/restful";
import { searchFlight } from "model/flight/search"
import { dealLogin } from "model/flight/agent";


@Restful()
export class SearchFlightController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async $before(req, res, next) {
        let { auth } = req.headers;
        let result = await dealLogin(auth);

        if (result.code != 0) {
            return res.json(reply(500, null));
        }
        if (req.method == "GET") {
            req.query.sessionId = result.data;
        } else {
            req.body.sessionId = result.data;
        }
        next()
    }
    @Router("/getList/:departureCode/:arrivalCode/:depDate","GET")
    async getList(req, res, next) {
        let query = {};
        let param = req.params;
        if (typeof param == 'string') {
            param = JSON.parse(param);
        }
        query["departureCity"] = param.departureCode;
        query["arrivalCity"] = param.arrivalCode;
        query["departureDate"] = param.depDate;
        query['sessionId'] = req.query.sessionId;
        let data: any;
        try {
            data = await searchFlight(query);
            res.json(data);
        } catch (err) {
            console.log(err);
            res.json(data);
        }
    }
}

