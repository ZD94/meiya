'use strict';
import {AbstractController, Restful, Router, Reply} from '@jingli/restful'
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require("request");

@Restful()
export class ReturnController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    //订购单创建退票单
    async add(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/CreateReturnOrder",
            header: {
                'content-type': 'application/json'
            },
            body: {},
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, null));
        }
    }

    //取消退票
    async delete(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/CancelReturnOrder",
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

    //提交退票审批
    async update(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/SubmitReturnOrder",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        }
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //退票单列表
    async find(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/GetReturnOrderList",
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

    //退票单详情
    async get (req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/GetReturnOrderInfo",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }
}






















