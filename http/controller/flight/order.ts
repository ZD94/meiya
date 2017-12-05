'use strict';

import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {proxyHttp, transAttributeName,handle} from '../../util';
import {
    creatOrder,
    createChangeOrder,
    createReturnOrder,
    getOrderList,
    getOrderInfo,
    getReturnOrderInfo,
    getChangeOrderInfo
} from "model/flight/order";
import {cancelOrder, cancelChangeOrder, cancelReturnOrder} from "model/flight/cancle";
import {submitOrder, submitReturnOrder} from "model/flight/confirm";
import {dealLogin} from "model/flight/agent";

@Restful()
export class OrderController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async $before(req, res, next) {
        let {auth} = req.headers;
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

    //订票单，改签单，退票单创建
    async add(req, res, next) {
        let query = req.body;
        let data;
        if (query.type == "order") {
            try {
                data = await creatOrder(query);
                await handle(req,data.orderNo);
                res.json(data)
            } catch (err) {
                console.log(err);
                res.json(reply(500, data))
            }
        } else if (query.type == "change") {
            try {
                data = await createChangeOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err);
                res.json(data)
            }
        } else if (query.type == "return") {
            /*
            * 订购单创建退票单
            * */
            try {
                data = await createReturnOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
                res.json(data)
            }
            /*
            * 改签单创建退票单
            * */
        }
    }

    //订单，改签单，退票单的取消
    async delete(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query.orderNo = id;
        let data;
        if (query.type == "order") {
            try {
                data = await cancelOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
                res.json(data)
            }

        } else if (query.type == "change") {
            try {
                data = await cancelChangeOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
                res.json(reply(500, data))
            }

        } else if (query.type == "return") {
            try {
                data = await cancelReturnOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err);
                res.json(reply(500, data))
            }
        }
    }

    //提交订票单、改签单、退票单审批
    async update(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query.orderNo = id;
        let data;
        if (query.type == "order") {
            try {
                data = await submitOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err);
                res.json(data)
            }
        } else if (query.type == "return") {
            try {
                data = await submitReturnOrder(query);
                res.json( data)
            } catch (err) {
                console.log(err);
                res.json(reply(500, data))
            }
        }
    }

    //订单详情
    @Router("/getOrderInfo/:orderNo/:type", "GET")
    async getOrderInfo(req, res, next) {
        let query = req.query;
        let param = req.params;
        query["orderNo"] = param.orderNo;

        query["type"] = param.type
        let data;
        if (query.type == "order") {
            try {
                data = await getOrderInfo(query);
                res.json(data);
            } catch (err) {
                console.log(err)
                res.json(data)
            }
        } else if (query.type == "change") {
            try {
                data = await getChangeOrderInfo(query);
                res.json(data)
            } catch (err) {
                console.log(err)
                res.json(reply(500, data))
            }
        } else if (query.type == "return") {
            try {
                data = await getReturnOrderInfo(query);
                res.json(data)
            } catch (err) {
                console.log(err)
                res.json(reply(500, data))
            }
        }
    }

    //订单列表
    @Router("/getOrderList/:orderType", "GET")
    async getOrderList(req, res, next) {
        let query = {};
        let param = req.params;
        if (typeof param == 'string') {
            param = JSON.parse(param);
        }
        query["type"] = param.orderType;
        query['sessionId'] = req.query.sessionId;
        let data;
        if (query["type"] == "order") {
            try {
                data = await getOrderList(query);
                res.json(data);
            } catch (err) {
                console.log(err);
                res.json(data)
            }
        }
    }
}

