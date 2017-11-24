"use strict";

import {AbstractController, Restful, Router, reply} from "@jingli/restful"
import {dealLogin} from "model/train/agent"
import {creatOrder} from "model/train/order"
import {cancelOrder} from "model/train/cancle"
import {submitOrder} from "model/train/confirm"


@Restful()
export class orderTrainController extends AbstractController {
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

    //车票的创建与退订
    async add(req, res, next) {
        let query = req.body;
        let data;
        if (query.type == "order") {
            try {
                data = await creatOrder(query);
                res.json(reply(0, data.data));
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        } else if (query.type == "return") {
            try {
                console.log("waiting......")
            } catch (err) {
                console.log(err)
                res.json(reply(500, null))
            }
        }
    }

    //创建单与退票单的取消
    async delete(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query.OrderNo = id;
        let data;
        if (query.type == "order") {
            try {
                data = await cancelOrder(query);
                res.json(reply(0, data.code))
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        } else if (query.type == "return") {
            try {
                console.log("waiting......")
            } catch (err) {
                console.log(err);
                res.json(reply(500, null))
            }
        }
    }

    //订购单与退票单的审批
    async update(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query.orderNo = id;
        let data;
        if(query.type == "order"){
            try {
                data = await submitOrder(query);
                res.json(reply(0, data.code))
            }catch (err){
                console.log(err);
                res.json(500,null)
            }
        }else if(query.type == "return"){
            try{
                console.log("waiting..........")
            }catch (err){
                console.log(err);
                res.json(reply(500,null))
            }
        }
    }

}



























