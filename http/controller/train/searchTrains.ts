"use strict";
import {AbstractController, Restful, Router, reply} from "@jingli/restful"
import {search} from "model/train/search"
import {dealLogin} from "model/train/agent"

@Restful()

export class searchTrainsController extends AbstractController {
    constructor() {
        super()
    }

    $isValidId(id: string) {
        return true
    }

    async $before(req, res, next) {
        let {auth} = req.headers;
        let result = await dealLogin(auth);
        if (result.code != 0) {
            return res.json(reply(500, null))
        }
        if (req.method == "GET") {
            req.query.sessionId = result.data.sessionId;
            req.query.companyId = result.data.companyId;
            req.query.userId = result.data.userId
        } else {
            req.body.sessionId = result.data.sessionId;
            req.body.companyId = result.data.companyId;
            req.body.userId = result.data.userId
        }
        next()
    }

    @Router("/getList/:depCity/:arrCity/:depDate","GET")
    async getList(req, res, next) {
        let query = {};
        let param = req.params;
        if (typeof param == 'string') {
            param = JSON.parse(param);
        }
        query["FromStationName"] = param.depCity;
        query["ToStationName"] = param.arrCity;
        query["DepartureDate"] = param.depDate;
        query['sessionId'] = req.query.sessionId;
        query['userId'] = req.query.userId;
        query['companyId'] = req.query.companyId;

        let data: any;
        try {
            data = await search(query);
            res.json(reply(data.code, data.data.TrainInfoList))
        } catch (e) {
            console.log(e);
            res.json(reply(500, null))
        }
    }


    @Router("/getInfo","POST")
    async geiInfo(req, res, next) {
        let query = req.body;
        let data: any;
        try {
            data = await search(query);
            res.json(reply(data.code, data.data.TrainInfoList))
        } catch (e) {
            console.log(e);
            res.json(reply(500, null))
        }
    }

}