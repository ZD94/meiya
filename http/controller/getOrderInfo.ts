

'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'
let config = require("@jingli/config");
let reqs = require('request');


@Restful()
export class GetInfoController extends AbstractController{
    constructor(){
        super();
    }

    $isValidId(id:string){
        return true
    }

    @Router('/getOrderInfo')
    async other(req,res2,next){
        let {orderNo,sessionId} = req.body;
        let params = {
            url:`${config.meitaUrl}` + "/GetOrderInfo",
            method:"POST",
            header:{
                'content-type': 'application/json'
            },
            body:{
                orderNo,
                sessionId
            }
        };
        let data = await proxyHttp(params);
        res2.json(Reply(0,data))
    }
}
