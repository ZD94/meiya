
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
                "departureCity": "PEK",
                "arrivalCity": "SHA",
                "departureDate": "2018-06-10",
                "tripType":1,
                "sessionId":"636452335003320079"
            },
            header:{
                'content-type': 'application/json'
            },
            method:"POST"
        };
        let data : any= await proxyHttp(params);
        if(data.code == '10000'){
            res2.json(Reply(0, data));
        } else {
            res2.json(Reply(502, data.description));
        }

    }
}

