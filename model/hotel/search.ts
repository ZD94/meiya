let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "../../http/util";
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache";

export async function getCityList(query): Promise<{ code: number, msg: string, data?: any }> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/getCityList",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"  
    };
    
    let datas = await proxyHttp(params);
    if (datas.d.cityList.length) {
        return {
            code: 0,
            data: datas.d.cityList,
            msg: 'ok'
        }
    } else {
        return {
            code: 502, 
            data: null,
            msg: 'failed'
        }
    }
}

export async function searchHotel(query): Promise<ReplyData> {

    let testArr = [
        {
            newname: 'cityCode',
            oldname: 'city'
        }
    ];
    let querys = transAttributeName(query, testArr);
    let params = {
        url: `${config.meiyaHotelUrl}` + "/queryHotels",
        body: {
            request: querys
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST" 
    };
    console.log('query', querys);
    let datas = await proxyHttp(params);
    let itemsChange = [
        {
            newname: 'hotelId',
            oldname: 'hotelCode'
        },
        {
            newname: 'cnName',
            oldname: 'hotelCNName'
        },
        {
            newname: 'enName',
            oldname: 'hotelENName'
        },
        {
            newname: 'address',
            oldname: 'hotelAddress'
        },
        {
            newname: 'starRating',
            oldname: 'starCode'
        },
        {
            newname: 'mobile',
            oldname: 'hotelPhone'
        }
    ];
    let itChange = [
        {
            newname: 'priceNow',
            oldname: 'price'
        },
        {
            newname: 'dateNow',
            oldname: 'sellDate'
        }
    ];

    let iteChange = [
        {
            newname: 'roomPlanId',
            oldname: 'ratePlanID'
        },
        {
            newname: 'supplierId',
            oldname: 'supplierCode'
        },
        {
            newname: 'cancelOrderTerm',
            oldname: 'termCancelDescription'
        },
        {
            newname: 'datePriceList',
            oldname: 'priceList'
        }
    ];

    let itemChange = [
        {
            newname: 'roomId',
            oldname: 'roomCode'
        },
        {
            newname: 'hasInternet',
            oldname: 'intent'
        }
    ];

    console.log(datas.d);
    
    console.log(JSON.stringify(datas.d.hotelInfoList));

    if (datas.d.code == '10000') {
        for (let items of datas.d.hotelInfoList) {
            for (let item of items.hotelRoomList) {
                for (let ite of item.hotelPriceList) {
                    for (let it of ite.priceList) {
                        transAttributeName(it, itChange);
                    }
                    transAttributeName(ite, iteChange);
                }
                transAttributeName(item, itemChange);
            }
        transAttributeName(items, itemsChange);
        }
        return reply(0, datas.d.hotelInfoList);
    } else {
        return reply(502, datas.d.description);
    }
}