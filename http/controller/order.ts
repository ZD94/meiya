'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../util'
import {creatOrder, createChangeOrder, createReturnOrder, getOrderList, getOrderInfo} from "model/order"
import {cancelOrder, cancelChangeOrder, cancelReturnOrder} from "model/cancle"
import {submitOrder, submitReturnOrder} from "model/confirm"

let config = require("@jingli/config");

@Restful()
export class OrderController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    //订票单，改签单，退票单创建
    async add(req, res, next) {
        let query = req.body;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        if (query.type == "order") {
            try {
                data = await creatOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err);
            }
        } else if (query.type == "change") {
            try {
                data = await createChangeOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
            }
        } else if (query.type == "return") {
            /*
            * 订购单创建退票单
            * */
            try {
                data = createReturnOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
            }
            /*
            * 改签单创建退票单
            * */
        }
    }

    //订单，改签单，退票单的取消
    async delete(req, res, next) {
        let query = req.body;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        if (query.type == "order") {
            try {
                data = cancelOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
            }

        } else if (query.type == "change") {
            try {
                data = cancelChangeOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }

        } else if (query.type == "return") {
            try {
                data = cancelReturnOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    //提交订票单、改签单、退票单审批
    async update(req, res, next) {
        let query = req.body;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        if (query.type == "order") {
            try {
                data = submitOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }
        } else if (query.type == "return") {
            try {
                data = submitReturnOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    //订单详情
    async get (req, res, next) {
        let query = req.query;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        try {
            data = await getOrderInfo(query);
            res.json(data);
        } catch (err) {
            console.log(err)
        }
    }

    //订单列表
    async find(req, res, next) {
        let query = req.body;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        try {
            data = await getOrderList(query);
            res.json(data);
        } catch (err) {
            console.log(err)
        }
    }
}
