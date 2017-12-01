let config = require('@jingli/config');
import {proxyHttp, transAttributeName} from 'http/util';
import {reply, ReplyData} from '@jingli/restful';
import cache from '@jingli/cache';

//预订订单提交审批
export async function submitHotelOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/submitHotelOrder",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        }
    };
    let datas = await proxyHttp(params);
    let res = {
        statusCode: datas.d.code,
        result: datas.d.description
    };

    if (datas.d.code == '10000') {
        return reply(0, res);
    } else {
        return reply(502, datas.d.description);
    }
}

//退票订单提交审批
export async function submitHotelReturnOrder(query): Promise<ReplyData> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/submitHotelReturnOrder",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        } 
    };
    let datas = await proxyHttp(params);
    let res = {
        statusCode: datas.d.code,
        result: datas.d.description
    };

    if (datas.d.code == '10000') {
        return reply(0, res);
    } else {
        return reply(502, datas.d.description);
    }
}