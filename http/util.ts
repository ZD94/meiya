let request = require("request");


export async function proxyHttp(params: {
    url: string;
    method?: string;
    body: object;
    qs?: object;
    header?: object;
}) {
    let {url, body = {}, method = "get", qs = {}, header = {}} = params;
    return new Promise((resolve, reject) => {
        request({
            url,
            body,
            json: true,
            method,
            qs,
            headers: header
        }, (err, resp, result) => {
            try {
                if (typeof result == 'string') {
                    try {
                        result = JSON.parse(result);
                        console.log(result, '<=====result')
                    } catch (e) {
                        return reject(e);
                    }
                }
                return resolve(result);
            } catch (err) {
                return reject(err)
            }
        });
    })
}