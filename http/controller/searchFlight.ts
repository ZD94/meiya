'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, transAttributeName} from '../util'

let config = require("@jingli/config");

let reqs = require('request');

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
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let testArr = [
            {
                newname: "departureDate",
                oldname: "depDate"
            },
            {
                newname: "arrivalCity",
                oldname: "arrivalCode"
            },
            {
                newname: "departureCity",
                oldname: "departureCode"
            }
        ];

        transAttributeName(query, testArr);

        let params = {
            url: `${config.meiyaUrl}` + '/QueryFlights',
            body: query,
            header: {
                'content-type': 'application/json'
            },
        };
        let data: any;
        try {
            data = await proxyHttp(params);
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
            // res.json(Reply(0,data))
        } catch (err) {
            console.log(err, '<======err');
            return res.json(Reply(502, null))
        }
    }
}


