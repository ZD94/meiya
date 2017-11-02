'use strict';
import {AbstractController, Restful, Router, Reply} from "@jingli/restful";
import {proxyHttp} from '../util'

let config = require("@jingli/config");
let reqs = require('request');

@Restful()
export class CreatController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    @Router('/creatOrder')
    async other(req, res2, next) {
        let {sessionId,type} = req.body;
        let params = {
            url: `${config.meiyaUrl}` + "/CreateOrder",
            body: {
                "flightList":
                    [{
                        "flightID": "a9a1f6d9522f4167b7f1753c10d72a3c_831c993e4b0b4831aeb4ce884a00eedd_15",
                        "departureCity": "PEK",
                        "arrivalCity": "SHA",
                        "departureDate": "2018-06-10",
                        "airline": "上海航空",
                        "cabinType": "S",
                        "flightNo": "FM9108",
                        "price":610
                    }],
                "passengerList":
                    [{
                        "outsidePassengerId": "20171025002",
                        "passengerType": "成人",
                        "companyId": "S117325",
                        "cnName": "张栋",
                        "certificatesList":
                            [{
                                "certType": "身份证",
                                "certNumber": "411527199408012774",
                            }],
                    }],
                "contactList":
                    {
                        "orderNo": "",
                        "contactName": "张栋",
                        "mobile": "15978561146",
                    },
                "sessionId": "636452335003320079"
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
        };
        let data : any = await proxyHttp(params);

        if(data.code == '10000'){
            res2.json(Reply(0, data));
        } else {
            res2.json(Reply(502, data.description));
        }
    }
}
