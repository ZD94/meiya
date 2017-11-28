let request = require("request-promise");
import config = require("@jingli/config");
import * as fs from "fs";
import * as path from "path";

export async function proxyHttp(params: {
    url: string;
    method?: string;
    body: object;
    qs?: object;
    header?: object;
}): Promise<any> {
    let { url, body = {}, method = "post", qs = {}, header = {} } = params;
    let options = {
        url,
        body,
        json: true,
        method,
        qs,
        headers: header
    };

    // console.log(options);
    let data;
    if (config.fake_data) {
        let filepath = recordedData(url);
        try {
            data = require(filepath);
        } catch (e) {

        }
    }
    if (!data) {
        try {
            data = await request(options);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    if (config.recordData) {
        if (data.code == "10000") {
            recordedData(url, data);
        }
    }
    console.log(data.length, "<===========data");
    return data;
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
                    let obj = {
                        segmentNo: [],
                        passengerCode: [],
                        contactName: "",
                        mobile: ""
                    };
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
                    obj.mobile = mobile;
                    resolve(obj)
                }
            } else {
                console.log(err);
                reject(err)
            }
        });
    })
}

function recordedData(url: string, data?: object) {
    let reg = /\/|\:/ig;
    let filename = url.replace(reg, "") + ".json";
    let filepath = path.join(process.cwd(), "test/data", filename);
    if (!data) {
        return filepath;
    }
    try {
        fs.statSync(path.join(process.cwd(), "test/data"));
    } catch (e) {
        fs.mkdirSync(path.join(process.cwd(), "test/data"));
    }

    let source = fs.createWriteStream(filepath);
    let result = JSON.stringify(data, null, 4);

    source.write(result);
    source.end(() => {
        console.log("数据记录结束 :", filepath);
    });
}

import crypto from "crypto";

export function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// var data = 'Hello, this is a secret message!';
// var key = config.AES;
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);

// console.log(encrypted, decrypted);
