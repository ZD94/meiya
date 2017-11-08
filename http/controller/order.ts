'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../util'

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
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        for (let i = 0; i < query.flightList.length; i++) {
            query.flightList[i].departureCity = query.flightList[i].departureCode;
            query.flightList[i].arrivalCity = query.flightList[i].arrivalCode;
            query.flightList[i].departureDate = query.flightList[i].depDate;
            delete query.flightList[i].depDate;
            delete query.flightList[i].arrivalCode;
            delete query.flightList[i].departureCode
        }
        for (let k = 0; k < query.passengerList.length; k++) {
            query.passengerList[k].cnName = query.passengerList[k].name;
            delete query.passengerList[k].name;
            if (query.passengerList[k].passengerType == 1) {
                query.passengerList[k].passengerType = "成人"
            } else if (query.passengerList[k].passengerType == 2) {
                query.passengerList[k].passengerType = "儿童"
            } else if (query.passengerList[k].passengerType == 3) {
                query.passengerList[k].passengerType = "婴儿"
            }
            query.passengerList[k].outsidePassengerId = query.passengerList[k].mobile;
            delete query.passengerList[k].mobile
        }

        let contactListNewName = [
            {
                newname: "contactName",
                oldname: "name"
            }
        ];
        transAttributeName(query.contactList, contactListNewName);

        let params = {
            url: `${config.meiyaUrl}` + "/CreateOrder",
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            let orderNos = {
                orderNos: data.orderNos
            };
            res.json(Reply(0, orderNos));
        } else {
            res.json(Reply(502, null));
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
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == '10000') {
            res.json(Reply(0, data.destination));
        } else {
            res.json(Reply(502, null));
        }
    }

    //订单列表
    async find(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;
        let params = {
            url: `${config.meiyaUrl}` + "/GetOrderList",
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, {result: data.orderList, total: data.totalCount}));
        } else {
            res.json(Reply(502, null));
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
                "sessionId": `${query.sessionId}`
            },
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, data.orderInfo));
        } else {
            res.json(Reply(502, null));
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
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);

        if (data.code == '10000') {
            res.json(Reply(0, data.description));
        } else {
            res.json(Reply(502, null));
        }
    }
}
