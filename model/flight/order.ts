let config = require("@jingli/config");
import {proxyHttp, transAttributeName, getInfo} from '../../http/util'
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache"

const url = "http://121.41.36.97:6005/API.svc/GetOrderInfo";

//订单的创建
export async function creatOrder(query): Promise<ReplyData> {

    for (let i = 0; i < query.flightList.length; i++) {
        query.flightList[i].departureCity = query.flightList[i].departureCode;
        query.flightList[i].arrivalCity = query.flightList[i].arrivalCode;
        query.flightList[i].departureDate = query.flightList[i].depDate;
        delete query.flightList[i].depDate;
        delete query.flightList[i].arrivalCode;
        delete query.flightList[i].departureCode
    }
    for (let k = 0; k < query.passengerList.length; k++) {
        // let str = /[\u4e00-\u9fa5]\n/;
        // console.log(query.passengerList[k].name,"<=============333333333")
        // if(str.test(query.passengerList[k].name)){
        //     console.log(111111111)
        //     query.passengerList[k].cnName = query.passengerList[k].name;
        // }else {
        //     console.log(222222222)
        //     query.passengerList[k].enName = query.passengerList[k].name;
        // }
        query.passengerList[k].cnName = query.passengerList[k].name;
        // console.log(query.passengerList[k],"<====================query.passengerList[k].name")
        delete query.passengerList[k].name;
        if (query.passengerList[k].passengerType == 1) {
            query.passengerList[k].passengerType = "成人"
        } else if (query.passengerList[k].passengerType == 2) {
            query.passengerList[k].passengerType = "儿童"
        } else if (query.passengerList[k].passengerType == 3) {
            query.passengerList[k].passengerType = "婴儿"
        }
        query.passengerList[k].outsidePassengerId = query.passengerList[k].mobile;
        delete query.passengerList[k].mobile
    }

    let contactListNewName = [
        {
            newname: "contactName",
            oldname: "name"
        }
    ];
    transAttributeName(query.contactList, contactListNewName);
    let datas;
    let params = {
        url: `${config.meiyaUrl}` + "/CreateOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"

    };
    datas = await proxyHttp(params);


    if (datas.code == "10000") {
        let orderNos = {
            orderNos: datas.orderNos
        };
        return reply(0, orderNos)
    } else {
        return reply(502, datas.description);
    }
}

//创建改签单
export async function createChangeOrder(query): Promise<ReplyData> {
    for (let i = 0; i < query.flightList.length; i++) {
        query.flightList[i].departureCity = query.flightList[i].departureCode;
        query.flightList[i].arrivalCity = query.flightList[i].arrivalCode;
        query.flightList[i].departureDate = query.flightList[i].depDate;
        delete query.flightList[i].depDate;
        delete query.flightList[i].arrivalCode;
        delete query.flightList[i].departureCode
    }
    let contactListNewName = [
        {
            newname: "contactName",
            oldname: "name"
        }
    ];
    transAttributeName(query.contactList, contactListNewName);
    //获取旅客编号
    let info = await getInfo(url, query.sessionId, query.originalOrderNo);
    query.passengerList = info["passengerCode"];
    let datas;
    let params = {
        url: `${config.meiyaUrl}` + "/CreateChangeOrder",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"

    };
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        let orderNos = {
            orderNos: datas.orderNo
        };
        return reply(0, orderNos);
    } else {
        return reply(502, null);
    }
}

//订购单创建退票单
export async function createReturnOrder(query): Promise<ReplyData> {

    if (query.flightList) {
        delete query.flightList
    }
    //获取旅客编号及行段序号
    let info = await getInfo(url, query.sessionId, query.originalOrderNo);
    query.passengerList = info["passengerCode"];
    query.segmentList = info["segmentNo"];

    let contactListNewName = [
        {
            newname: "contactName",
            oldname: "name"
        }
    ];
    transAttributeName(query.contactList, contactListNewName);
    let datas;
    let params = {
        url: `${config.meiyaUrl}` + "/CreateReturnOrder",
        header: {
            'content-type': 'application/json'
        },
        body: query,
        method:"POST"

    };
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return reply(0, datas);
    } else {
        return reply(502, null);
    }
}

//订单列表
export async function getOrderList(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/GetOrderList",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"

    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return reply(0, {result: datas.orderList, total: datas.totalCount});
    } else {
        return reply(502, null);
    }
}

//订单详情
export async function getOrderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/GetOrderInfo",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return reply(0, datas.orderInfo);
    } else {
        return reply(502, datas.description);
    }
}

//退票单详情
export async function getReturnOrderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/GetReturnOrderInfo",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"

    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return reply(0, datas.orderInfo);
    } else {
        return reply(502, null);
    }
}

//改签单详情
export async function getChangeOrderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaUrl}` + "/GetChangeOrderInfo",
        body: query,
        header: {
            'content-type': 'application/json'
        },
        method:"POST"
    };
    let datas;
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return reply(0, datas.orderInfo);
    } else {
        return reply(502, null);
    }
}


