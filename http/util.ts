let request = require("request");

export async function proxyHttp(params:{
    url: string;
    method?:string;
    body?:object;
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
                return reject(err);
            }

            if (typeof result == 'string') {
                try{
                    result = JSON.parse(result);
                }catch(e){
                    return reject(e);
                }
            }
            return resolve(result);
        });
    })
}