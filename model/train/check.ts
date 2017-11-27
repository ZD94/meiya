let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "http/util"
import {reply, ReplyData} from "@jingli/restful"


export async function checkTicket(req): Promise<ReplyData> {
    let query = req.query;
    let testArr = [
        {
            newname: "FromStation",
            oldname: "DepStation"
        },
        {
            newname: "ToStation",
            oldname: "ArrStation"
        },
        {
            newname: "StartTime",
            oldname: "DepDate"
        }
    ];
    switch (query.SeatID) {
        case "二等座":
            query.SeatID = 209;
            break;
        case "硬卧":
            query.SeatID = 224;
            break;
        case "软卧":
            query.SeatID = 225;
            break;
        case "一等座":
            query.SeatID = 207;
            break;
        case "硬座":
            query.SeatID = 201;
            break;
        case "软座":
            query.SeatID = 203;
            break;
        case "无座":
            query.SeatID = 227;
            break;
        case "商务座":
            query.SeatID = 221;
            break;
        case "一等软座":
            query.SeatID = 230;
            break;
        case "二等软座":
            query.SeatID = 231;
            break;
        case "特等座":
            query.SeatID = 100;
            break;
        case "高级软卧":
            query.SeatID = 101;
            break;
        case "动卧":
            query.SeatID = 102;
            break;
    }
    let querys = transAttributeName(query, testArr);
    let params = {
        url: `${config.meiyaTrainUrl}` + "/checkTrainIsBookable",
        body: {
            request: querys
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.d.__type || datas.d.TrainNumber || datas.d.FromStation || datas.d.SeatName || datas.d.ToStation) {
        delete datas.d.__type;
        delete datas.d.TrainNumber;
        delete datas.d.FromStation;
        delete datas.d.SeatName;
        delete datas.d.ToStation;
        delete datas.d.description;
    }

    console.log(datas.d.code,"<================check");
    if (datas.d.code == "10000") {
        delete datas.d.code;
        return reply(0, datas.d)
    } else {
        return reply(502, null)
    }


}