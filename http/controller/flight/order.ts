'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../../util'
import {creatOrder, createChangeOrder, createReturnOrder, getOrderList, getOrderInfo} from "model/flight/order"
import {cancelOrder, cancelChangeOrder, cancelReturnOrder} from "model/flight/cancle"
import {submitOrder, submitReturnOrder} from "model/flight/confirm"
let md5 = require("md5");
let config = require("@jingli/config");
import cache from "@jingli/cache"

@Restful()
export class OrderController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }
    async $before(req, res, next) {
        let {username, password} = req.headers;
        if (!username || !password) {
            return res.json(Reply(500, null));
        }
        let key = md5(username + password);
        let sessionId = await cache.read(key);
        if (req.method == "GET") {
            req.query.sessionId = sessionId["sessionId"]
        } else {
            req.body.sessionId = sessionId["sessionId"]
        }
        next()
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
                data =await createReturnOrder(query);
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
                data =await cancelOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
            }

        } else if (query.type == "change") {
            try {
                data =await cancelChangeOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }

        } else if (query.type == "return") {
            try {
                data =await cancelReturnOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    //提交订票单、改签单、退票单审批
    async update(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query.orderNo = id;
        let data;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;
        if (query.type == "order") {
            try {
                data = await submitOrder(query);
                console.log(data,"<==========2222222");
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
