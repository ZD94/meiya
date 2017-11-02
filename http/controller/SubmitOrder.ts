'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'
let config = require("@jingli/config");
let reqs = require('request');

@Restful()
export class SubmitController extends AbstractController{
    constructor(){
        super();
    }
    $isValidId(){
        return true
    }

    @Router('/submitOrder')
    async other(req,res2,next){
        let {orderNo,sessionId} = req.body;
        let params = {
            url : `${config.meiyaUrl}` + "/SubmitOrder",
            method:"POST",
            header:{
                'content-type': 'application/json'
            },
            body:{
                "orderNo":"TB1700203436",
                "sessionId":"636452335003320079"
            }
        };
        let data : any = await proxyHttp(params);
        if(data.code == '10000'){
            res2.json(Reply(0, data));
        } else {
            res2.json(Reply(502, data.description));
        }
    }
}
