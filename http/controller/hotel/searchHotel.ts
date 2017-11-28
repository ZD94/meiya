'use strict';
import {AbstractController, Restful, Router, reply} from '@jingli/restful';
import {dealLogin} from 'model/hotel/agents';
import {searchHotel, getCityList, getHotelDetail} from 'model/hotel/search'

let cityList;
@Restful()
export class SearchHotelController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }
    

    async $before(req, res, next) {
        let {auth} = req.headers;
        let result = await dealLogin(auth);
        if (result.code != 0) {
            return res.json(reply(500, null));
        }
        if (req.method == 'GET') {
            req.query.sessionId = result.data.sessionId;
            req.query.userId = result.data.userId;
            req.query.companyId = result.data.companyId;
        } else {
            req.body.sessionId = result.data.sessionId;
            req.body.userId = result.data.userId
            req.body.companyId= result.data.companyId;
        }

        let datas = await getCityList(result.data);
        cityList = datas.data;
        for (let i = 0; i < cityList.length; i++) {
            if (cityList[i].cn == req.query.city) {
                req.query.city = cityList[i].code;
            }
            if (cityList[i].cn == req.body.city) {
                req.body.city = cityList[i].code;
            }
        }
        next();
    }

    @Router('/getList/:city/:checkInDate/:checkOutDate', 'GET')
    async getList(req, res, next) {
        let query = {};
        let param = req.params;
        if (typeof param == 'string') {
            param = JSON.parse(param);
        }
        query['city'] = param.city;
        query['checkInDate'] = param.checkInDate;
        query['checkOutDate'] = param.checkOutDate;
        query['sessionId'] = req.query.sessionId;
        query['userId'] = req.query.userId;
        query['companyId'] = req.query.companyId;

        for (let i = 0; i < cityList.length; i++) {
            if (cityList[i].cn == query['city']) {
                query['city'] = cityList[i].code;
            }
        }

        console.log('queryss', query);

        let data: any;
        try {
            data = await searchHotel(query);
            res.json(data);
        } catch(err) {
            console.log(err);
        }
    }

    async add(req, res, next) {
        let query = req.body;
        let data: any;
        try {
            data = await searchHotel(query);
            res.json(data);
        } catch(err) {
            console.log(err);
        }

    }

    @Router('/getDetail/:hotelId/:checkInDate/:checkOutDate', 'GET')
    async getDetail(req, res, next) {
        let query = {};
        let param = req.params;
        query['hotelId'] = param.hotelId;
        query['checkInDate'] = param.checkInDate;
        query['checkOutDate'] = param.checkOutDate;
        query['sessionId'] = req.query.sessionId;
        query['userId'] = req.query.userId;
        query['companyId'] = req.query.companyId;

        let data: any;
        try {
            data = await getHotelDetail(query);
            res.json(data); 
        } catch(err) {
            console.log(err);
        }
    }
}