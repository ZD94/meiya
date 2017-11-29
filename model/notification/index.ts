let config = require('@jingli/config');
let crypto = require('crypto');
import {transAttributeName} from 'http/util';


//处理美亚发送的预订通知
export async function handleNotificationMY(query): Promise<{code: any}> {
    let request: any = query.request;
    let password: string = request.password;
    let timeStamp: string = request.timeStamp;
    let msgType: string = request.msgType;
    let data: object = request.data;

    //对password进行SHA1解密,取出timeStamp和key进行比对校验
    

}