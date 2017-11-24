let config = require('@jingli/config');
import {proxyHttp, transAttributeName, getInfo} from 'http/util';
import {reply, ReplyData} from '@jingli/restful';

// 创建酒店订单
export async function createHotelOrder(query): Promise<ReplyData> {
    let changeName = [
        {
            newname: 'outSideOrderNo',
            oldname: 'JLOrderNo'
        },
        {
            newname: 'oaSerialNumber',
            oldname: 'tripApproveId'
        },
        {
            newname: 'hotelCode',
            oldname: 'hotelId'
        },
        {
            newname: 'roomCode',
            oldname: 'roomId'
        },
        {
            newname: 'ratePlanId',
            oldname: 'roomPlanId'
        },
        {
            newname: 'supplierCode',
            oldname: 'supplierId'
        },
        {
            newname: 'priceList',
            oldname: 'datePriceList'
        },
        {
            newname: 'firstArriveTime',
            oldname: 'earliestArriveTime'
        },
        {
            newname: 'lastArriveTime',
            oldname: 'latestArriveTime'
        }
    ];
    let itemChange = [
        {
            newname: 'price',
            oldname: 'priceNow'
        },
        {
            newname: 'sellDate',
            oldname: 'dateNow'
        }
    ];
    for (let item of query.datePrice) {
       transAttributeName(item, itemChange); 
    }
    transAttributeName(query, changeName);
    
    let params = {
        url: `${config.meiyaHotelUrl}` + "/createHotelOrder",
        body: {
            request: query
        }, 
        header: {
            'content-type': 'application/json'
        }
    };
    let datas = await proxyHttp(params);

    if (datas.d.code == '10000') {
        let orderNo = {
            orderNo: datas.d.orderNo
        };
        return reply(0, orderNo);
    } else {
        return reply(502, null);
    } 
}

//创建酒店退票订单
export async function createHotelReturnOrder(query): Promise<ReplyData> {
    let changeName = [
        {
            newname: 'returRoomInfoList',
            oldname: 'canceledRoomInfoList'
        }
    ];
    transAttributeName(query, changeName);
    let itemChange = [
        {
            newname: 'returnDate',
            oldname: 'canceledDate'
        },
        {
            newname: 'returnPassengerList',
            oldname: 'canceledPassengerList'
        },
        {
            newname: 'returnItemList',
            oldname: 'canceledItemList'
        }
    ];
    for (let item of query.canceledRoomInfoList) {
        transAttributeName(item, itemChange);
    }
    let params = {
        url: `${config.meiyaHotelUrl}` + "/createHotelReturnOrder",
        header: {
            'content-type': 'application/json'
        },
        body: {
           request: query 
        }
    };
    let datas = await proxyHttp(params);
    if (datas.d.code == '10000') {
        let orderNo = {
            orderNo: datas.d.orderNo
        };
        return reply(0, orderNo);
    } else {
        return reply(502, null);
    }
}

//订购单详情查询
export async function getHotelOrderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/queryHotelOrderInfo",
        header: {
            'content-type': 'application/json'
        },
        body: {
           request: query 
        } 
    };
    let datas = await proxyHttp(params);
    let changeName = [
        {
            newname: 'JLOrderNo',
            oldname: 'orderNo'
        },
        {
            newname: 'hotelId',
            oldname: 'hotelcode'
        },
        {
            newname: 'tripApproveId',
            oldname: 'outsideOrderNo'
        },
        {
            newname: 'roomId',
            oldname: 'roomCode'
        },
        {
            newname: 'earliestArriveTime',
            oldname: 'firstArriveTime'
        },
        {
            newname: 'latestArriveTime',
            oldname: 'lastArriveTime'
        },
        {
            newname: 'datePriceList',
            oldname: 'priceList'
        }
    ];
    transAttributeName(datas.d.orderInfo, changeName);
    let itemChange = [
        {
            newname: 'priceNow',
            oldname: 'price'
        },
        {
            newname: 'dateNow',
            oldname: 'sellDate'
        }
    ];
    for (let item of datas.d.orderInfo.priceList) {
        transAttributeName(item, itemChange);
    }
    if (datas.d.code == '10000') {
        return reply(0, datas.d.orderInfo);
    } else {
        return reply(502, null);
    }
}

//退票单详情查询
export async function getHotelReturnOrderInfo(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/queryHotelReturnOrderInfo",
        header: {
            'content-type': 'application/json'
        },
        body: {
           request: query 
        }  
    };
    let datas = await proxyHttp(params);
    if (datas.d.code == '10000') {
        return reply(0, datas.d.HrOrderInfo);
    } else {
        return reply(502, null);
    }
}