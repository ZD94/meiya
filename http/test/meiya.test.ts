'use strict';

let request = require("request");

let expect = require("chai").expect;

const url = "http://121.41.36.97:6005/API.svc";

describe('/美亚订票流程', function () {
    let sessionId;
    this.timeout(5000);
    before((done) => {
        request({
            url: url + "/Login",
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "userName": "JingLiZhiXiang",
                "password": '123456',
                "passwordType": "3",
            }
        }, function (err, res, body) {
            let result;
            if (!err && res.statusCode == 200) {
                let id = res.body.sessionId;
                result = res.body;
            } else {
                console.log(err);
            }
            sessionId = result.sessionId;
            expect(result.code).to.be.equal("10000");
            done()
        });
    });

    let data, flightID, departureCity, arrivalCity, departureDate, airline, cabinType, flightNo, price;
    it("get /查询航班", (done) => {
        request({
            url: url + "/QueryFlights",
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "flightID": "",
                "departureCity": "PEK",
                "arrivalCity": "SHA",
                "departureDate": "2018-05-15",
                "departureTime":
                    [0],
                "airline": "",
                "cabinClass": "",
                "tripType": 1,
                "tripNum": 0,
                "isShowALLPrice": false,
                "isForce": false,
                "sessionId": sessionId
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                return
            }
            let result;
            try {
                result = res.body
            } catch (err) {
                result = body
            }
            data = result.flightInfoList[0];
            flightID = data.flightPriceInfoList[0].flightID;
            departureCity = data.orgAirportCode;
            arrivalCity = data.desAirportCode;
            departureDate = data.depDate;
            airline = data.airlineName;
            cabinType = data.flightPriceInfoList[0].cabinType;
            flightNo = data.flightNo;
            price = data.flightPriceInfoList[0].ticketPrice;
            console.log(flightID, departureCity, arrivalCity, departureDate, airline, cabinType, flightNo, price, "<====data");
            expect(result.code).to.be.equal("10000");
            done()
        })
    });
    let order;
    it("/创建订单", (done) => {
        setTimeout(() => {
            request({
                url: url + "/CreateOrder",
                method: 'POST',
                json: true,
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    "flightList":
                        [{
                            "flightID": `${flightID}`,
                            "departureCity": `${departureCity}`,
                            "arrivalCity": `${arrivalCity}`,
                            "departureDate": `${departureDate}`,
                            "airline": `${airline}`,
                            "cabinType": `${cabinType}`,
                            "flightNo": `${flightNo}`,
                            "price": `${price}`
                        }],
                    "passengerList":
                        [{
                            "outsidePassengerId": "20171025002",
                            "passengerType": "成人",
                            "companyId": "S117325",
                            "cnName": "张栋",
                            "enName": "",
                            "userName": "",
                            "dName": "",
                            "nationality": "",
                            "birthday": "",
                            "mobile": "",
                            "email": "",
                            "certificatesList":
                                [{
                                    "certType": "身份证",
                                    "certNumber": "411527199408012773",
                                    "expiration": "",
                                    "isFlightCertificate": false
                                }],
                        }],
                    "contactList":
                        {
                            "orderNo": "",
                            "contactName": "张栋",
                            "mobile": "15978561146"
                        },
                    "sessionId": sessionId
                }
            }, (err, res, body) => {
                if (err) {
                    console.log(err);
                    return
                }
                let result;
                try {
                    result = res.body
                } catch (err) {
                    result.body
                }
                order = result.orderNos;
                expect(result.code).to.be.equal("10000");
                done()
            }, 2000)
        })
    });

    it("订单详情", (done) => {
        request({
            url: url + "/GetOrderInfo",
            method: "POST",
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "orderNo": order[0],
                "sessionId": sessionId
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                return
            }
            let result;
            try {
                result = res.body;
            } catch (err) {
                result = body
            }
            expect(result.code).to.be.equal("10000");
            done()
        })
    });

    /*it("取消订单", (done) => {
        request({
            url: url + "/CancelOrder",
            method: "POST",
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "orderNo": order[0],
                "sessionId": sessionId
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                return
            }
            let result;
            try {
                result = res.body
            } catch (err) {
                result = body
            }
            expect(result.code).to.be.equal("10000");
            done()
        })
    });
*/

    it("提交审批", (done) => {
        console.log(order[0], sessionId, "<========00000");
        request({
            url: url + "/SubmitOrder",
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            json: true,
            body: {
                "orderNo": order[0],
                "sessionId": sessionId
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                return
            }
            let result;
            try {
                result = res.body;
            } catch (err) {
                result = body
            }
            console.log(result, "<=====result");
            expect(result.code).to.be.equal("10000");
            done()
        })
    })
});

