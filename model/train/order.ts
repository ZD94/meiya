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
        } else {
            return reply(404, datas.d.description)
        }

    }
}

//订单详情
export async function orderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaTrainUrl}` + "/queryTrainOrderInfo",
        method: "POST",
        json: true,
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        }
    };
    let datas = await proxyHttp(params);
    if (datas.d.code == "10000") {
        if (datas.d.OrderInfo.ContactInfo || datas.d.OrderInfo.CostList || datas.d.OrderInfo.InvoiceInfo) {
            delete datas.d.OrderInfo.ContactInfo;
            delete datas.d.OrderInfo.CostList;
            delete datas.d.OrderInfo.InvoiceInfo;
            delete datas.d.OrderInfo.TicketTrain.OrderNo;
            let BaseInfoKey = ["outsideOrderNo", "orderNo", "originalOrderNo", "opDate", "statusText", "oaSerialnumber"];
            for (let item in datas.d.OrderInfo.BaseInfo) {
                if (BaseInfoKey.indexOf(item) == -1) {
                    delete datas.d.OrderInfo.BaseInfo[`${item}`];
                }
            }
            let changeName = [
                {
                    newname: "DepStation",
                    oldname: "FromStation"
                },
                {
                    newname: "ArrStation",
                    oldname: "ToStation"
                },
                {
                    newname: "DepDate",
                    oldname: "DepartureTime"
                },
                {
                    newname: "ArrDate",
                    oldname: "ArriveTime"
                },
            ];
            transAttributeName(datas.d.OrderInfo.TicketTrain, changeName);
            let PassengerListKey = ["SeatNum", "TicketPrice", "PassengerType", "ServicePrice", "ElectronicOrderNo", "IssueStatus", "Reason"]

            datas.d.OrderInfo.PassengerList.map(function (item) {
                for (let key in item) {
                    if (PassengerListKey.indexOf(key) == -1) {
                        delete item[`${key}`];
                    }
                }
            });
            let ApproveInfoKey = ["ActName", "Result"];
            datas.d.OrderInfo.ApproveInfo.map(function (item) {
                for (let key in item) {
                    if (ApproveInfoKey.indexOf(key) == -1) {
                        delete item[`${key}`];
                    }
                }
            })
        }
        return reply(0, datas.d.OrderInfo)
    } else {
        return reply(404, datas.d.description)
    }
}