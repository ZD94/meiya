// let config = require("@jingli/config");
// let md5 = require("md5");
//
// import {proxyHttp} from 'http/util';
// import {reply, ReplyData} from "@jingli/restful";
//
// import cache from "@jingli/cache"
//
// export async function login(userName, password): Promise<ReplyData> {
//     let params = {
//         url: `${config.meiyaTrainUrl}` + '/Login',
//         body: {
//             userName,
//             password
//         },
//         header: {
//             'content-type': 'application/json'
//         },
//         method: "POST",
//         json: true
//     };
//
//     let datas: any = await proxyHttp(params);
//     console.log(datas, "<=========datas");
//     // if (datas.code == '10000') {
//     //     let sessionId = {
//     //         sessionId: datas.sessionId
//     //     };
//     //     //redis 存储
//     //     let cacheId = userName + password;
//     //     let param = md5(cacheId);
//     //     await cache.write(param, sessionId, config.tmcCacheTime * 1000 * 60);
//     //
//     //     return reply(0, sessionId)
//     // } else {
//     //     return reply(502, null)
//     // }
//     return datas
// }
//
// /* deal login */
// export async function dealLogin(auth): Promise<{ code: number, msg: string, data?: any }> {
//     let {userName, password} =
// }