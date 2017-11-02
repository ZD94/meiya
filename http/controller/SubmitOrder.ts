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
                orderNo,
                sessionId
            }
        };
        let data = await proxyHttp(params);
        if(data) data = JSON.stringify(data);
        res2.json(Reply(0,{msg:`${data}`}))
    }
}
