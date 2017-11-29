// let config = require('@jingli/config');
// let crypto = require('crypto');
// import {transAttributeName} from 'http/util';

// let key = '';


// //处理美亚发送的预订通知
// export async function handleNotificationMY(query): Promise<{code: any}> {
//     let request: any = query.request;
//     let password: string = request.password;
//     let timeStamp: string = request.timeStamp;
//     let msgType: string = request.msgType;
//     let data: object = request.data;

//     //将password和key进行字典序排序后SHA1加密,与得到的password进行比对校验    
//     let str: string[] = [timeStamp.toLocaleLowerCase(), key.toLocaleLowerCase()];

//     //sort
//     for (let i = 0; i < str.length; i++) {
//         str.sort(function(a, b):number {return (a- b);});
//     }
// }