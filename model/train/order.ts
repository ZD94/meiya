let config = require("@jingli/config");
import {proxyHttp, transAttributeName, getInfo} from '../../http/util'
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache"

const url = "http://121.41.36.97:6005/APIForTrain.asmx/checkTrainIsBookable";

export async function creatOrder(query): Promise<ReplyData> {
    //检查车票是否可以预订
    let TrainNumber = query.TrainNumber;
    let FromStation = query.DepStation;
    let ToStation = query.ArrStation;
    let StartTime = query.DepDate;
    let SeatID = query.SeatInfo.SeatName;
    let PassengerNums = query.PassengerNums;
    let companyId = query.companyId;
    let userId = query.userId;
    let sessionId = query.sessionId;

    let checkQuerys = {
        "TrainNumber": `${TrainNumber}`,
        "FromStation": `${FromStation}`,
        "ToStation": `${ToStation}`,
        "StartTime": `${StartTime}`,
        "SeatID": `${SeatID}`,
        "PassengerNums": `${PassengerNums}`,
        "companyId": `${companyId}`,
        "userId": `${userId}`,
        "sessionId": `${sessionId}`
    };
    let params = {
        url: `${config.meiyaTrainUrl}` + "/checkTrainIsBookable",
        body: {
            request: checkQuerys
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    }
    let datas;
    datas = await proxyHttp(params);
    if (datas.d.IsBook) {
        let testArr = [
            {
                newname: "FromStationName",
                oldname: "DepStation"
            },
            {
                newname: "ToStationName",
                oldname: "ArrStation"
            },
            {
                newname: "StartDate",
                oldname: "DepDate"
            },
            {
                newname: "EndDate",
                oldname: "ArrDate"
            }
        ];
        let querys = transAttributeName(query, testArr);
        let params = {
            url: `${config.meiyaTrainUrl}` + "/createTrainOrder",
            body: {
                request: querys
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST"
        }
        let datas = await proxyHttp(params);
        if (datas.d.code == "10000") {
            if (datas.d.__type || datas.d.code || datas.d.description) {
                delete datas.d.__type;
                delete datas.d.code;
                delete datas.d.description
            }
            return reply(0, datas.d)
        }
    } else {
        return reply(404, datas.d.description)
    }

}