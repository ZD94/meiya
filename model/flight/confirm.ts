let config = require("@jingli/config");
import {proxyHttp} from "../../http/util"
import {Reply} from "@jingli/restful"

import cache from "@jingli/cache"

//订购单提交审批
export async function submitOrder(query) {
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
        return Reply(0, datas.description);
    } else {
        return Reply(502, null);
    }
}

export async function submitReturnOrder(query){
    let params = {
        url: `${config.meiyaUrl}` + "/SubmitReturnOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
    datas = await proxyHttp(params);
    if(datas.code == "10000"){
        return Reply(0,datas)
    }else {
        return Reply(502,null)
    }
}