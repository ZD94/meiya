'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../util'
import {searchFlight} from "../../model/search"
let config = require("@jingli/config");

@Restful()
export class SearchFlightController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async find(req, res, next) {
        let query = req.query;
        // let {auth} = req.headers;
        // auth = JSON.parse(decodeURIComponent(auth));
        // query.sessionId = auth.sessionId;


        let data: any;
        try {
            data = await searchFlight(query);
            if (data.code == '10000') {
                let changeName = [
                    {
                        newname: "departure",
                        oldname: "orgCity"
                    },
                    {
                        newname: "departureCode",
                        oldname: "orgCityCode"
                    },
                    {
                        newname: "arrival",
                        oldname: "desCity"
                    },
                    {
                        newname: "arrivalCode",
                        oldname: "desCityCode"
                    },
                    {
                        newname: "airline",
                        oldname: "airlineName"
                    }
                ];
                transAttributeName(data.flightInfoList, changeName);
                for(let item of data.flightInfoList){
                    for(let items of item.flightPriceInfoList){
                        items.price = items.ticketPrice;
                    }
                }
                return res.json(Reply(0, data.flightInfoList) || []);
            } else {
                return res.json(Reply(502, null));
            }
        } catch (err) {
            console.log(err, '<======err');
            return res.json(Reply(502, null))
        }
    }
}


