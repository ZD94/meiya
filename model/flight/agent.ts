let config = require("@jingli/config");
let md5 = require("md5");
import { proxyHttp } from '../../http/util';
import { reply, ReplyData } from "@jingli/restful";

import cache from "@jingli/cache"

export async function login(userName, password): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + '/Login',
        body: {
            userName,
            password,
            "passwordType": "3"
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };

    let datas: any = await proxyHttp(params);


    if (datas.code == '10000') {
        let sessionId = {
            sessionId: datas.sessionId
        };
        //redis 存储
        let cacheId = userName + password;
        let param = md5(cacheId);
        await cache.write(param, sessionId, config.tmcCacheTime * 1000 * 60);

        return reply(0, sessionId)
    } else {
        return reply(502, null)
    }
}

