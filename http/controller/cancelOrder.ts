

'use strict';
import {AbstractController, Restful, Router, Reply} from '@jingli/restful'
import {proxyHttp} from '../util'
let config = require("@jingli/config");

let reqs = require('request');
@Restful()
export class CancelController extends AbstractController{
    constructor(){
        super();
    }

    $isValidId(id:string){
        return true;
    }

    @Router("/cancelOrder")
    async other(req,res2,next){
        let params = {
            url:`${config.meiyaUrl}`+"/CancelOrder",
            body:{

            },
            header:{
                'content-type': 'application/json'
            },
            method:"POST"
        };
        let data = await proxyHttp(params);
        if(data) data = JSON.stringify(data);
        res2.json(Reply(0,{msg:`${data}`}))
    }
}

