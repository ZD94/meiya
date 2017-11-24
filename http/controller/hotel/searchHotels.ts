'use strict';
import {AbstractController, Restful, Router, reply} from '@jingli/restful';
import {dealLogin} from 'model/hotel/agents';
import {searchHotel, getCityList} from 'model/hotel/search'

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
        let cityList = datas.data;
        for (let i = 0; i < cityList.length; i++) {
            if (cityList[i].cn == req.query.city) {
                req.query.city = cityList[i].code;
            }
        }
        next();
    }

    async find(req, res, next) {
        let query = req.query;
        let data: any;

        try {
            data = await searchHotel(query);
            res.json(data);
        } catch(err) {
            console.log(err);
        }
    }
}