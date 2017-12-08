let config = require('@jingli/config');
let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
let moment = require("moment");
import {transAttributeName, proxyHttp} from 'http/util';
import Logger from "@jingli/logger";
var logger = new Logger('main');


let key = '4f3f29eb05ee4cda81528647e91608d4';


//处理美亚发送的预订通知
export async function handleMYNotification(query, num): Promise<{code: string, description: string}> {
    let password: string = query.password;
    let timeStamp: string = query.timeStamp;
    let msgType: string = query.msgType;
    let data: any = query.data;

    //将password和key进行字典序排序后SHA1加密,与得到的password进行比对校验    
    let str: string[] = [timeStamp.toLocaleLowerCase(), key.toLocaleLowerCase()];

    //sort
    str.sort();

    if (str[0].toLocaleUpperCase() == timeStamp.toLocaleLowerCase()) {
        str = [timeStamp, key];
    } else {
        str = [key, timeStamp];
    }

    //concat
    let testStr: string = '';
    for (let i = 0; i < str.length; i++) {
        testStr += str[i];
    }

    //cipher
    console.log('testStr', testStr);
    let cipher = crypto.createHash('sha1');
    cipher.update(testStr);
    let crypted = cipher.digest('hex');
    
    if (crypted == password) { //校验成功
        logger.info(moment().format("YYYY-MM-DD hh:mm:ss"), " 美亚回调事件  ", data);

        //请求tmc,验证返回数据正确与否
        let params = {
            url: `${config.tmcUrl}` + '/getFromTmc',
            body: {
                orderNo: data.orderNo
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST'
        };
        let datas = await proxyHttp(params);
        console.log('get from tmc return ------------>', datas);
        return {code: '10000', description: '通知成功'};
    } else {
        console.log('crypted======>', crypted);
        console.log('password======>', password);
        console.log('----------------------校验失败---------------------');
        return {code: '666', description: '校验失败'};
    }
}