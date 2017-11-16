let config = require("@jingli/config");
import {proxyHttp, transAttributeName, getInfo} from '../../http/util'
import {Reply} from "@jingli/restful";
import cache from "@jingli/cache"

const url = "http://121.41.36.97:6005/API.svc/GetOrderInfo";

//订单的创建
export async function creatOrder(query) {

    for (let i = 0; i < query.flightList.length; i++) {
        query.flightList[i].departureCity = query.flightList[i].departureCode;
        query.flightList[i].arrivalCity = query.flightList[i].arrivalCode;
        query.flightList[i].departureDate = query.flightList[i].depDate;
        delete query.flightList[i].depDate;
        delete query.flightList[i].arrivalCode;
        delete query.flightList[i].departureCode
    }
    for (let k = 0; k < query.passengerList.length; k++) {
        query.passengerList[k].cnName = query.passengerList[k].name;
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
        }
    };
    datas = await proxyHttp(params);

    if (datas.code == "10000") {
        let orderNos = {
            orderNos: datas.orderNos
        };
        return Reply(0, orderNos)
    } else {
        return Reply(502, null);
    }
}

//创建改签单
export async function createChangeOrder(query) {

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
        }
    };
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        let orderNos = {
            orderNos: datas.orderNo
        };
        return Reply(0, orderNos);
    } else {
        return Reply(502, null);
    }
}

//订购单创建退票单
export async function createReturnOrder(query) {

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
    };
    datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return Reply(0, datas);
    } else {
        return Reply(502, null);
    }
}

//订单列表
export async function getOrderList(query) {
    let params = {
        url: `${config.meiyaUrl}` + "/GetOrderList",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
        datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return Reply(0, {result: datas.orderList, total: datas.totalCount});
    } else {
        return Reply(502, null);
    }
}

//订单详情
export async function getOrderInfo(query) {
    let params = {
        url: `${config.meiyaUrl}` + "/GetOrderInfo",
        body: query,
        header: {
            'content-type': 'application/json'
        }
    };
    let datas;
        datas = await proxyHttp(params);
    if (datas.code == '10000') {
        return Reply(0, datas.orderInfo);
    } else {
        return Reply(502, null);
    }
}
















