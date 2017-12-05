let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "http/util"
import {reply, ReplyData} from "@jingli/restful"
import cache from "@jingli/cache"

export async function search(query): Promise<ReplyData> {

    let testArr = [
        {
            newname: "FromStationName",
            oldname: "depCity"
        },
        {
            newname: "ToStationName",
            oldname: "arrCity"
        },
        {
            newname: "DepartureDate",
            oldname: "depDate"
        }
    ];
    let querys = transAttributeName(query, testArr);
    let params = {
        url: `${config.meiyaTrainUrl}` + '/queryTrains',
        body: {
            request: querys
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST",
        json: true
    };
    let datas = await proxyHttp(params);
    if (datas.d.code == "10000") {
        let changeName = [
            {
                newname: "ArrDate",
                oldname: "EndTime"
            },
            {
                newname: "DepDate",
                oldname: "StartTime"
            },
            {
                newname: "DepStation",
                oldname: "FromStationName"
            },
            {
                newname: "ArrStation",
                oldname: "ToStationName"
            },
        ];
        transAttributeName(datas.d.TrainInfoList, changeName);
        for (let item of datas.d.TrainInfoList) {
            if (item.FromPassingType || item.ToPassingType) {
                delete item.FromPassingType;
                delete item.ToPassingType
            }
        }
        return reply(0, datas.d)
    } else {
        return reply(502, datas.d.description)
    }
}