'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'
let config = require("@jingli/config");
let reqs = require("request");


@Restful()

export class GetList extends AbstractController{
    constructor (){
        super()
    }
    $isValidId(id:string){
        return true
    }

    @Router('/getOrderList')
    async other(req,res2,next){
        let {sessionId} = req.body;
        let params = {
            url : `${config.meiyaUrl}` + '/GetOrderList',
            method:"POST",
            header:{
                'content-type': 'application/json'
            },
            body:{
                sessionId
            }
        };
        let data = await proxyHttp(params);
        res2.json(Reply(0,data))
    }
}
