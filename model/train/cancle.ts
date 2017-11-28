import * as moment from "moment";

let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "http/util"
import {reply, ReplyData} from "@jingli/restful"
import _quarter = moment.unitOfTime._quarter;

export async function cancelOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaTrainUrl}` + '/cancelTrainOrder',
        method: "POST",
        header: {
            'content-type': 'application/json'
        },
        body: {
            request: query
        }
    }
    let datas = await proxyHttp(params);
    if (datas.d.code == "10000") {
        return reply(0, datas.d.description)
    } else {
        return reply(502, datas.d.description)
    }
}
