let config = require('@jingli/config');
import {proxyHttp, transAttributeName, getInfo} from 'http/util';
import {reply, ReplyData} from '@jingli/restful';

// create 
export async function createHotelOrderFake(query): Promise<ReplyData> {
    let orderNo = {
        orderNo: 'HR6666666666'
    };
    return reply(0, orderNo);
}

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
            newname: 'datePriceList',
            oldname: 'priceList'
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
    let iteChange = [
        {
            newname: 'outsidePassengerId',
            oldname: 'passengerId'
        },
        {
            newname: 'cnName',
            oldname: 'passengerName'
        }
    ]
    for (let item of query.datePriceList) {
       transAttributeName(item, itemChange); 
    }
    for (let ite of query.passengerList) {
        transAttributeName(ite, iteChange);
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
    
    console.log('params', JSON.stringify(params));
    let datas = await proxyHttp(params);

    if (datas.d.code == '10000') {
        let orderNo = {
            orderNo: datas.d.orderNo
        };
        return reply(0, orderNo);
    } else {
        console.log('datas.d', datas.d);
        return reply(502, datas.d.description);
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
        return reply(502, datas.d.description);
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
    // console.log('querys', query);
    let datas = await proxyHttp(params);
    let changeName = [
        {
            newname: 'JLOrderNo',
            oldname: 'outsideOrderNo'
        },
        {
            newname: 'hotelId',
            oldname: 'hotelCode'
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
    
    if (datas.d.code == '10000') {
        // console.log('datas.d', datas.d);
        for (let item of datas.d.orderInfo.priceList) {
            transAttributeName(item, itemChange);
        }
        transAttributeName(datas.d.orderInfo, changeName);
        
        return reply(0, datas.d.orderInfo);
    } else {
        return reply(502, datas.d.description);
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
        return reply(502, datas.d.description);
    }
}