

'use strict';
import {AbstractController, Restful, Router, Reply} from '@jingli/restful'
import {proxyHttp} from '../util'

let reqs = require("request");

@Restful()
export class ReturnController extends AbstractController{
    constructor(){
        super();
    }

    $isValidId(id:string){
        return true;
    }

    @Router("/returuOrder")
    async other(req,res2,next){
        let params = {
            url:"http://121.41.36.97:6005/API.svc/CreateReturnOrder",
            method:"POST",
            header:{
                'content-type': 'application/json'
            },
            body:{

            },
        };
        let data = await proxyHttp(params);
        if (data) data = JSON.stringify(data);
        res2.json(Reply(0,{msg:`${data}`}))
    }
}