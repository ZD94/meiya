let config = require("@jingli/config");
import {proxyHttp} from "http/util";
import {reply, ReplyData} from "@jingli/restful";

//订购单提交审批
export async function submitOrder(query) {
    let params = ({
        url: `${config.meiyaTrainUrl}` + "/submitTrainOrder",
        method: "POST",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        }
    });
    let datas = await proxyHttp(params);
    if(datas.d.code == "10000"){
        return reply(0,datas.d.description)
    }else {
        return reply(404,datas.d.description)
    }
}