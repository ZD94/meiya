'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require('request');

@Restful()
export class OrderController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    //创建订单
    async add(req, res, next) {
        let query = req.body;

        let params = {
            url: `${config.meiyaUrl}` + "/CreateOrder",
            body: {
                "flightList":
                    [{
                        "flightID": "",
                        "departureCity": "",
                        "arrivalCity": "",
                        "departureDate": "",
                        "airline": "",
                        "cabinType": "",
                        "flightNo": "",
                        "price":0
                    }],

            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }

    //取消订单
    async delete(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/CancelOrder",
            body: {
                "orderNo": `${query.orderNo}`,
                "sessionId":`${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }

    //订单列表
    async find(req, res, next) {
        let {auth} = req.headers;
        let params = {
            url: `${config.meiyaUrl}` + "/GetOrderList",
            body: {
                "sessionId":auth.sessionId
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }

    //订单详情
    async get (req, res, next) {
        let query = req.query;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/GetOrderInfo",
            body: {
                "orderNo": `${query.orderNo}`,
                "sessionId":`${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }

    //提交订单审批
    async update(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/SubmitOrder",
            body: {
                "orderNo": `${query.orderNo}`,
                "sessionId":`${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, data));
        } else {
            res.json(Reply(502, data.description));
        }
    }


}











