let config = require("@jingli/config");
import {proxyHttp} from '../http/util'
import {Reply} from "@jingli/restful";

import cache from "@jingli/cache"

//取消订购单
export async function cancelOrder(query) {
    let params = {
        url: `${config.meiyaUrl}` + '/CancelOrder',
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return Reply(0, datas.destination);
    } else {
        return Reply(502, null);
    }
}

//取消改签单
export async function cancelChangeOrder(query) {
    let params = {
        url: `${config.meiyaUrl}` + "/CancelChangeOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
    datas = await proxyHttp(params);

    if (datas.code == "10000") {
        return Reply(0, datas.description)
    } else {
        return Reply(502, null)
    }
}

//取消退票单
export async function cancelReturnOrder(query) {
    let params = {
        url: `${config.meiyaUrl}` + "/CancelReturnOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    }
    let datas;
     datas = await proxyHttp(params);
    if (datas.code == "10000") {
        return Reply(0, datas)
    } else {
        return Reply(502, null)
    }
}







