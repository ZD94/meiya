let config = require("@jingli/config");
let md5 = require("md5");

import {proxyHttp, aesEncrypt} from 'http/util';
import {reply, ReplyData} from "@jingli/restful";

import cache from "@jingli/cache"
var crypto = require('crypto');


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
    let {username, password} = JSON.parse(decodeURIComponent(auth));
    if (!username || !password) {
        return {
            code: -1,
            msg: "用户名或密码不存在"
        }
    }
    let AESkey = "4f3f29eb05ee4cda81528647e91608d4";
    let cipher = crypto.createCipheriv("aes-256-ecb", new Buffer(AESkey), new Buffer(0));
    let crypted = cipher.update(password, "utf-8", "base64");
    crypted += cipher.final("base64");
    let key = md5(username + crypted);
    let sessionId = await cache.read(key);

    if (!sessionId) {
        let result = await login(username, crypted);
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
