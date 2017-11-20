let config = require("@jingli/config");
import { proxyHttp } from "../../http/util"
import { reply, ReplyData } from "@jingli/restful"

import cache from "@jingli/cache"

//订购单提交审批
export async function submitOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/SubmitOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
    datas = await proxyHttp(params);

    if (datas.code == '10000') {
        return reply(0, datas.description);
    } else {
        return reply(502, null);
    }
}

export async function submitReturnOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/SubmitReturnOrder",
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