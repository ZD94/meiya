let config = require("@jingli/config");
let md5 = require("md5");

import {proxyHttp, aesEncrypt} from 'http/util';
import {reply, ReplyData} from "@jingli/restful";

import cache from "@jingli/cache"

export async function login(userName, password): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaTrainUrl}` + '/Login',
        body: {
            request: {
                userName,
                password
            }
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST",
    };
    let datas: any = await proxyHttp(params);
    if (datas.d.code == '10000') {
        let sessionId = {
            sessionId: datas.d.userInfo.sessionId,
            companyId: datas.d.userInfo.companyId,
            userId: datas.d.userInfo.userId
        };
        //redis 存储
        let cacheId = userName + password;
        let param = md5(cacheId);
        await cache.write(param, sessionId, config.tmcCacheTime * 60);

        return reply(0, sessionId)
    } else {
        return reply(502, null)
    }
}

/* deal login */
export async function dealLogin(auth): Promise<{ code: number, msg: string, data?: any }> {
    let {userName, password} = JSON.parse(decodeURIComponent(auth));
    if (!userName || !password) {
        return {
            code: -1,
            msg: "用户名或密码不存在"
        }
    }
    let key = md5(userName + password);
    let sessionId = await cache.read(key);
    console.log(sessionId, "<=======Id");
    if (!sessionId) {
        let result = await login(userName, password);
        if (result.code != 0) {
            return {
                code: -1,
                msg: "用户名或密码输入错误"
            }
        }
        sessionId = result.data;
    }
    return {
        code: 0,
        msg: "ok",
        data: sessionId
    }
}