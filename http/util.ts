let request = require("request");

export async function proxyHttp(params: {
    url: string;
    method?: string;
    body: object;
    qs?: object;
    header?: object;
}) {
    let {url, body = {}, method = "post", qs = {}, header = {}} = params;
    return new Promise((resolve, reject) => {
        console.log({
            url,
            body,
            json: true,
            method,
            qs,
            headers: header

        },"<====params");
        request({
            url,
            body,
            json: true,
            method,
            qs,
            headers: header

        }, (err, resp, result) => {
            console.log(result,"<======result");
            try {
                if (typeof result == 'string') {
                    try {
                        result = JSON.parse(result);
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

//参数名转换
export function transAttributeName(origin, arr, normal = true) {
    if(origin instanceof Array){
        for(let item of origin){
            deal(item);
        }
    }else {
        deal(origin);
    }

    function deal(target){
        for (let key in target) {
            for (let item of arr) {
                if (normal) {
                    if (item.oldname == key) {
                        target[item.newname] = target[item.oldname];
                        delete target[item.oldname];
                    }
                } else {
                    if (item.newname == key) {
                        target[item.oldname] = target[item.newname];
                        delete target[item.newname];
                    }
                }
            }
        }
    }

    return origin;
}

