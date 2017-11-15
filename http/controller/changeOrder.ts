'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp, getInfo, transAttributeName} from '../util'

let config = require("@jingli/config");
const url = "http://121.41.36.97:6005/API.svc/GetOrderInfo";

@Restful()
export class ChangeController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    //创建改签单
    async add(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));

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
        let datas = await getInfo(url, query.sessionId, query.originalOrderNo);
        query.passengerList = datas["passengerCode"];
        let params = {
            url: `${config.meiyaUrl}` + "/CreateChangeOrder",
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
    }

    //取消改签单
    async delete(req, res, next) {
        let query = req.body;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/CancelChangeOrder",
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data.description))
        } else {
            res.json(Reply(502, null))
        }
    }

    //改签单列表
    async find(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/GetChangeOrderList",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //改签单详情
    async get (req, res, next) {
        let query = req.query;
        let {auth} = req.headers;
        auth = JSON.parse(decodeURIComponent(auth));
        query.sessionId = auth.sessionId;

        let params = {
            url: `${config.meiyaUrl}` + "/GetChangeOrderInfo",
            body: query,
            header: {
                'content-type': 'application/json'
            }
        };
        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

    //提交改签单审批
    async update(req, res, next) {
        let params = {
            url: `${config.meiyaUrl}` + "/SubmitChangeOrder",
            body: {},
            header: {
                'content-type': 'application/json'
            }
        };

        let data: any = await proxyHttp(params);
        if (data.code == "10000") {
            res.json(Reply(0, data))
        } else {
            res.json(Reply(502, null))
        }
    }

}

























