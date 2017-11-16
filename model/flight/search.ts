let config = require("@jingli/config");
import { proxyHttp, transAttributeName } from "../../http/util";
import { Reply } from "@jingli/restful";
import cache from "@jingli/cache"

export async function searchFlight(query) {

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

    console.log(querys, "<=====querys")
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
        return Reply(0, datas.flightInfoList) || [];
    } else {
        return Reply(502, null);
    }
}