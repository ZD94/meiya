let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "../http/util";
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
    let params = {
        url: `${config.meiyaUrl}` + "/QueryFlights",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };

    let datas = await proxyHttp(params);
    console.log(datas, "<======datas");
    return datas
}