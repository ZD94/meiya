let request = require("request");


export async function proxyHttp(params:{
    url: string;
    method?:string;
    body:object;
    qs?:object;
    header?:object;
}){
    let {url, body={}, method="get", qs={}, header={}} = params;
    return new Promise((resolve, reject) => {
        request({
            url,
            body,
            json: true,
            method,
            qs,
            headers: header
        }, (err, resp, result) => {
            if (err) {
                return reject(err)
            }
            if (typeof result == 'string') {
                try{
                    result = JSON.parse(result);
                    console.log(result,'<=====result')
                }catch(e){
                    return reject(e);
                }
            }
            return resolve(result);
        });
    })
}

//
// export async function proxyHttp(){
//     request({
//         url: 'http://121.41.36.97:6005/API.svc/Login',
//         method: 'POST',
//         json: true,
//         headers: {
//             'content-type': 'application/json'
//         },
//         body:  {
//             "userName": "JingLiZhiXiang",
//             "password": '123456',
//             "passwordType": "3",
//         }
//     }, function (err, res, body) {
//         if (!err && res.statusCode == 200) {
//             let id = res.body.sessionId;
//             let result = JSON.stringify(res.body);
//             console.log(result, "<======login");
//             return result
//         } else {
//             console.log(err);
//         }
//     });
// }
//
