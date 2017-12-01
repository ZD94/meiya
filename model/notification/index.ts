let config = require('@jingli/config');
let crypto = require('crypto');
let fs = require('fs');
import {transAttributeName} from 'http/util';

let key = '4f3f29eb05ee4cda81528647e91608d4';


//处理美亚发送的预订通知
export async function handleMYNotification(query, num): Promise<{code: string, description: string}> {
    let password: string = query.password;
    let timeStamp: string = query.timeStamp;
    let msgType: string = query.msgType;
    let data: object = query.data;

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
        fs.writeFileSync(`test/MYresult_${num}.json`, JSON.stringify(data), 'utf-8'); 
        return {code: '10000', description: '通知成功'};
    } else {
        console.log('crypted======>', crypted);
        console.log('password======>', password);
        console.log('----------------------校验失败---------------------');
        return {code: '666', description: '校验失败'};
    }
}