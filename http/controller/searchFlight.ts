
'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'
let config = require("@jingli/config");

let reqs = require ('request');

@Restful()
export class SearchController extends AbstractController{
    constructor(){
        super();
    }

    $isValidId(id:string){
        return true;
    }
    @Router("/searchFlight")
    async other(req,res2,next){
        let {departureCity,arrivalCity,departureDate,airCompanies,channels,cabins,type,sessionId} = req.body;
        let params = {
            url:`${config.meiyaUrl}`+'/QueryFlights',
            body:{
                departureCity,
                arrivalCity,
                departureDate,
                type,
                sessionId
            },
            header:{
                'content-type': 'application/json'
            },
            method:"POST"
        };
        let data = await proxyHttp(params);
        if (data) data = JSON.stringify(data);

        res2.json(Reply(0,data))
    }
}

