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

        }, "<====params");
        request({
            url,
            body,
            json: true,
            method,
            qs,
            headers: header

        }, (err, resp, result) => {
            console.log(result, "<======result");
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
    if (origin instanceof Array) {
        for (let item of origin) {
            deal(item);
        }
    } else {
        deal(origin);
    }

    function deal(target) {
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

//获取旅客编号和航段信息
export async function getInfo(url, id, orderNo) {
    return new Promise((resolve, reject) => {
        let obj = {
            segmentNo: [],
            passengerCode: [],
            contactName: "",
            mobile: ""
        };
        request({
            url: `${url}`,
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "orderNo": `${orderNo}`,
                "sessionId": `${id}`
            }
        }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                let result = JSON.stringify(res.body);
                if (res.body.orderInfo.baseInfo.statusText != '已出票') {
                    getInfo(url, id, orderNo);
                } else {
                    for (let i = 0; i < res.body.orderInfo.segmentList.length; i++) {
                        let segmentNo = res.body.orderInfo.segmentList[i].segmentNo;
                        obj.segmentNo.push(segmentNo)
                    }
                    for (let i = 0; i < res.body.orderInfo.passengerList.length; i++) {
                        let passengerCode = res.body.orderInfo.passengerList[i].passengerCode;
                        obj.passengerCode.push(passengerCode)
                    }
                    let contactName = res.body.orderInfo.contactInfo.contactName;
                    obj.contactName = contactName;
                    let mobile = res.body.orderInfo.contactInfo.mobile;
                    obj.mobile = mobile
                }
                resolve(obj)
            } else {
                console.log(err);
                reject(err)
            }
        });
    })
}

