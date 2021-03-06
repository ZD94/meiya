"use strict";
import {AbstractController, Restful, Router, reply} from "@jingli/restful"
import {checkTicket} from "model/train/check"
import {dealLogin} from "model/train/agent"

@Restful()
export class checkController extends AbstractController {
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
            req.query.userId = result.data.userId;
        } else {
            req.body.sessionId = result.data.sessionId;
            req.body.companyId = result.data.companyId;
            req.body.userId = result.data.userId;
        }
        next()
    }

    async find(req, res, next) {
        let data: any;
        try {
            data = await checkTicket(req);
            res.json(reply(data.code, data))
        } catch (e) {
            console.log(e)
            res.json(reply(500, null))
        }
    }

}