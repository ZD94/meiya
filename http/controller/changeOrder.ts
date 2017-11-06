'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require("request");

@Restful()
export class ChangeController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    //创建改签单
    async add(req, res, next) {
        // let query = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CreateChangeOrder",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };

        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, null));
        }
    }

    //取消改签单
    async delete(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/CancelChangeOrder",
            body: {
                "orderNo": `${query.orderNo}`,
                "sessionId":`${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //改签单列表
    async find(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/GetChangeOrderList",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //改签单详情
    async get (req, res, next) {
        let query = req.query;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/GetChangeOrderInfo",
            body: {
                "orderNo": `${query.orderNo}`,
                "sessionId":`${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //提交改签单审批
    async update(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/SubmitChangeOrder",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };

        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

}

























