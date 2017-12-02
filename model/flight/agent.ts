let config = require("@jingli/config");
let md5 = require("md5");

import {proxyHttp} from '../../http/util';
import {reply, ReplyData} from "@jingli/restful";

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
        await cache.write(param, sessionId, config.tmcCacheTime * 60);

        return reply(0, sessionId)
    } else {
        return reply(502, null)
    }
}

/* deal login */
export async function dealLogin(auth): Promise<{ code: number, msg: string, data?: any }> {
    let username, password;
    let authObj = decodeURIComponent(auth);
    try{
        authObj = JSON.parse(authObj);
        username = authObj["username"];
        password = authObj["password"];
        if (!username || !password){
            throw new Error("auth 解析错误");
        }
    }catch(e){
        return {
            code: -1,
            msg: "用户名或密码不存在"
        }
    }

    let key = md5(username + password);
    let sessionId = await cache.read(key);
    if (!sessionId) {
        //go login
        let result = await login(username, password);
        if (result.code != 0) {
            return {
                code: -1,
                msg: "用户名或密码输入不正确"
            }
        }
        sessionId = result.data;
    }

    return {
        code: 0,
        msg: "ok",
        data: sessionId.sessionId
    }
}