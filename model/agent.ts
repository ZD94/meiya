let config = require("@jingli/config");
import {proxyHttp} from '../http/util';
import {Reply} from "@jingli/restful";

import cache from "@jingli/cache"

export async function login(userName, password) {
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

    //redis 存储
    let cacheId = userName + password;
    await cache.write(cacheId, datas.sessionId, config.tmcCacheTime * 1000 * 60);


    if (datas.code == '10000') {
        let sessionId = {
            sessionId: datas.sessionId
        };
        return Reply(0, sessionId)
    } else {
        return Reply(502, null)
    }
}

