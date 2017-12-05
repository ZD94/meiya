let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "http/util";
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache"


export async function searchFlight(query): Promise<ReplyData> {
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
    let querys = transAttributeName(query, testArr);

    let params = {
        url: `${config.meiyaUrl}` + "/QueryFlights",
        body: querys,
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };
    let datas;
    datas = await proxyHttp(params);

    if (datas.code == "10000") {
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
        transAttributeName(datas.flightInfoList, changeName);
        for (let item of datas.flightInfoList) {
            for (let items of item.flightPriceInfoList) {
                items.price = items.ticketPrice;
            }
        }
        return reply(0, datas.flightInfoList || []);
    } else {
        return reply(502, datas.description);
    }
}



export async function searchFlightInfo(query): Promise<ReplyData> {
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
    let querys = transAttributeName(query, testArr);
    let params = {
        url: `${config.meiyaUrl}` + "/QueryFlights",
        body: querys,
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == "10000") {
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
        transAttributeName(datas.flightInfoList, changeName);
        let flightInfo;
        for (let item of datas.flightInfoList) {
            for (let items of item.flightPriceInfoList) {
                if(item.flightNo == querys.flightNo && items.priceID == querys.priceID){
                    flightInfo = item
                }
                items.price = items.ticketPrice;
            }
        }
        return reply(0, flightInfo || []);
    } else {
        return reply(502, null);
    }
}