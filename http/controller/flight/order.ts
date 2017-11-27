'use strict';

import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../../util';
import {creatOrder, createChangeOrder, createReturnOrder, getOrderList, getOrderInfo,getReturnOrderInfo,getChangeOrderInfo} from "model/flight/order";
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
                res.json(data);
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        } else if (query.type == "change") {
            try {
                data = await createChangeOrder(query);
                res.json(data);
            } catch (err) {
                console.log(err)
                res.json(reply(500, null))
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
                res.json(reply(500, null))
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
                res.json(reply(500, null))
            }

        } else if (query.type == "change") {
            try {
                data = await cancelChangeOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
                res.json(reply(500, null))
            }

        } else if (query.type == "return") {
            try {
                data = await cancelReturnOrder(query);
                res.json(data)
            } catch (err) {
                console.log(err)
                res.json(reply(500, null))
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
                console.log(data,"<===========qqqqqq")
                res.json(reply(data.code, data))
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        } else if (query.type == "return") {
            try {
                data = await submitReturnOrder(query);
                res.json(reply(data.code, data))
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        }
    }

    //订单详情
    async get (req, res, next) {
        let query = req.query;
        let {id} = req.params;
        query.orderNo = id;
        let data;
        if(query.type == "order"){
            try {
                data = await getOrderInfo(query);
                res.json(reply(0, data));
            } catch (err) {
                console.log(err)
                res.json(reply(500, null))
            }
        }else if(query.type == "change"){
            try{
                data = await getChangeOrderInfo(query)
                res.json(data.code,data)
            }catch (err){
                console.log(err)
                res.json(reply(500,null))
            }
        }else if(query.type == "return"){
            try{
                data = await getReturnOrderInfo(query)
                res.json(data.code,data)
            } catch (err){
                console.log(err)
                res.json(reply(500,null))
            }
        }

    }

    //订单列表
    async find(req, res, next) {
        let query = req.query;
        let data;
        try {
            data = await getOrderList(query);
            res.json(data);
        } catch (err) {
            console.log(err)
            res.json(reply(500, null))
        }
    }
}

