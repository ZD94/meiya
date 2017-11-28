let config = require("@jingli/config");
let md5 = require("md5");

import {proxyHttp} from '../../http/util';
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache";
var crypto = require('crypto');

export async function login(userName, password): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + '/Login',
        body: {
            request:{
                userName: userName,
                password: password
            }
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST" 
    };

    let datas: any = await proxyHttp(params);
    console.log('datas', datas);

    if (datas.d.userInfo.sessionId) {
        let ids = {
            companyId: datas.d.userInfo.companyId,
            sessionId: datas.d.userInfo.sessionId,
            userId: datas.d.userInfo.userId
        };
        //redis
        let cacheId = userName + password;
        let params = md5(cacheId);
        await cache.write(params, ids, config.tmcCacheTime * 60);

        return reply(0, ids);
    } else {　　　　　　　　
        return reply(502, null);
    }
}　　

export async function dealLogin(auth): Promise<{ code: number, msg: string, data?: any }> {
    let authStr = decodeURIComponent(auth);
    console.log('authStr', authStr);

    let {username, password} = JSON.parse(authStr);
   
    if (!username && password) {
        return {
            code: -1,
            msg: '请输入用户名'
        }
    }
    if (username && !password) {
        console.log('password');
        return {
            code: -1,
            msg: '请输入密码'
        }
    }
    let AESKey = '4f3f29eb05ee4cda81528647e91608d4';
    let cipher = crypto.createCipheriv('aes-256-ecb', new Buffer(AESKey), new Buffer(0));
    let crypted = cipher.update(password, 'utf-8', 'base64');
    crypted += cipher.final('base64');
    console.log(crypted);

    let key = md5(username + crypted);
    let ids = await cache.read(key);
    if (!ids) {
        let result = await login(username, crypted);
        if (result.code != 0) {
            return {
                code: -1,
                msg: '用户名或密码输入不正确'
            }
        }
        ids = result.data;
    }
    console.log('ids', ids);
    return {
        code: 0,
        msg: 'ok',
        data: ids
    };
}