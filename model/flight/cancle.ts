let config = require("@jingli/config");
import { proxyHttp } from '../../http/util'
import { reply, ReplyData } from "@jingli/restful";

import cache from "@jingli/cache"

//取消订购单
export async function cancelOrder(query): Promise<ReplyData> {
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
        return reply(0, datas.destination);
    } else {
        return reply(502, null);
    }
}

//取消改签单
export async function cancelChangeOrder(query): Promise<ReplyData> {
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
        return reply(0, datas.description)
    } else {
        return reply(502, null)
    }
}

//取消退票单
export async function cancelReturnOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/CancelReturnOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == "10000") {
        return reply(0, datas)
    } else {
        return reply(502, null)
    }
}







