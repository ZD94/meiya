let config = require('@jingli/config');
import {proxyHttp} from 'http/util';
import {reply, ReplyData} from '@jingli/restful';
import cache from '@jingli/cache';

//取消订购单
export async function cancelHotelOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + '/cancelHotelOrder',
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    };
    let datas = await proxyHttp(params);
    if (datas.d.code == '10000') {
        return reply(0, datas.d.description);
    } else {
        return reply(502, datas.d.description);
    }
}

//取消退票单
export async function cancelHotelReturnOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + '/cancelHotelReturnOrder',
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"
    }; 
    let datas = await proxyHttp(params);
    if (datas.d.code == '10000') {
        return reply(0, datas.d.description);
    } else {
        return reply(502, datas.d.description);
    }
}
