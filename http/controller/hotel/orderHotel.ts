'use strict';
import {AbstractController, Restful, Router, reply} from '@jingli/restful';
import {proxyHttp, transAttributeName} from 'http/util';
import {createHotelOrder, createHotelReturnOrder, getHotelOrderInfo, getHotelReturnOrderInfo, createHotelOrderFake} from 'model/hotel/order';
import {submitHotelOrder, submitHotelReturnOrder, submitHotelOrderFake} from 'model/hotel/confirm';
import {cancelHotelOrder, cancelHotelReturnOrder} from 'model/hotel/cancel';
import {dealLogin} from 'model/hotel/agents';
import {submitReturnOrder} from 'model/flight/confirm';

@Restful() 
export class OrderHotelController extends AbstractController {
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
        if (req.method == 'GET') {
            req.query.sessionId = result.data.sessionId;
            req.query.userId = result.data.userId;
            req.query.companyId = result.data.companyId;
        } else {
            req.body.sessionId = result.data.sessionId;
            req.body.userId = result.data.userId
            req.body.companyId= result.data.companyId;
        }
        next();
    }

    //订票单,退票单创建
    async add(req, res, next) {
        let query = req.body;
        let data;
        console.log(typeof query);
        console.log(query);
        if (query.type == 'order') {//预订
            try {
                data = await createHotelOrderFake(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
        if (query.type == 'cancel') {//退票
            try {
                data = await createHotelReturnOrder(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
    }

    //订票单,退票单的审批
    async update(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query['OrderNo'] = id;
        let data;

        if (query.type == 'order') {
            try {
                data = await submitHotelOrderFake(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
        if (query.type == 'cancel') {
            try {
                data = await submitReturnOrder(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
    }

     //订票单,退票单详情
     async get(req, res, next) {
        let query = req.query;
        let {id} = req.params;
        query['OrderNo'] = id;
        let data;

        if (query.type == 'order') {
            try {
                data = await getHotelOrderInfo(query);
                res.json(data); 
            } catch(err) {
                console.log(err);
            }
        }
        if (query.type == 'cancel') {
            try {
                data = await getHotelReturnOrderInfo(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
    }

    //订票单,退票单的取消
    async delete(req, res, next) {
        let query = req.body;
        let {id} = req.params;
        query['OrderNo'] = id;
        let data;

        if (query.type == 'order') {
            try {
                data = await cancelHotelOrder(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
        if (query.type == 'cancel') {
            try {
                data = await cancelHotelReturnOrder(query);
                res.json(data);
            } catch(err) {
                console.log(err);
            }
        }
    }

}