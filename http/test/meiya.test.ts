'use strict';

let request = require("request");

let expect = require("chai").expect;

const url = "http://localhost:3000/";

describe('/美亚订票流程', function () {
    let sessionId;
    this.timeout(10000);

    before("login", (done) => {
        request({
            url: url + "Auth",
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                "userName": "JingLiZhiXiang",
                "password": '123456',
            }
        }, function (err, res, body) {
            let result;
            if (!err && res.statusCode == 200) {
                result = res.body;
            } else {
                console.log(err);
            }
            sessionId = result.data.sessionId;
            expect(result.code).to.be.equal(0);
            done()
        });
    });
    let data, flightID, departureCity, arrivalCity, departureDate, airline, cabinType, flightNo, price;
    let data2, flightID2, departureCity2, arrivalCity2, departureDate2, airline2, cabinType2, flightNo2, price2
    it("get /查询航班", (done) => {
        request({
            url: url + "SearchFlight",
            method: 'GET',
            json: true,
            headers: {
                userName: "JingLiZhiXiang",
                password: "123456"
            },
            qs: {
                "departureCode": "PEK",
                "arrivalCode": "SHA",
                "depDate": "2018-09-16",
                supplier: "meiya",
                tripType: 1
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

            data = result.data[1];
            flightID = data["flightPriceInfoList"][0].flightID;
            departureCity = data.orgAirportCode;
            arrivalCity = data.desAirportCode;
            departureDate = data.depDate;
            airline = data.airline;
            cabinType = data.flightPriceInfoList[0].cabinType;
            flightNo = data.flightNo;
            price = Number(data.flightPriceInfoList[0].ticketPrice);

            data2 = result.data[2];
            flightID2 = data["flightPriceInfoList"][0].flightID;
            departureCity2 = data.orgAirportCode;
            arrivalCity2 = data.desAirportCode;
            departureDate2 = data.depDate;
            airline2 = data.airline;
            cabinType2 = data.flightPriceInfoList[0].cabinType;
            flightNo2 = data.flightNo;
            price2 = Number(data.flightPriceInfoList[0].ticketPrice);
            expect(result.code).to.be.equal(0);
            done()
        })
    });


    let order;
    it("/创建订单", (done) => {
        request({
            url: url + "Order",
            method: 'POST',
            json: true,
            headers: {
                userName: "JingLiZhiXiang",
                password: "123456"
            },
            body: {
                "flightList":
                    [{
                        "flightID": `${flightID}`,
                        "departureCode": `${departureCity}`,
                        "arrivalCode": `${arrivalCity}`,
                        "depDate": `${departureDate}`,
                        "airline": `${airline}`,
                        "cabinType": `${cabinType}`,
                        "flightNo": `${flightNo}`,
                        "price": price
                    }],
                "passengerList":
                    [{
                        "name": "张栋",
                        "mobile": "15978561146",
                        "passengerType": "1",
                        "companyId": "S117325",
                        "certificatesList": [{
                            "certType": "身份证",
                            "certNumber": "411527199408012773"
                        }]
                    }],
                "contactList":
                    {
                        "name": "张栋",
                        "mobile": "15978561146"
                    },
                "type": "order",
                // "sessionId": sessionId
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
            order = result.data.orderNos[0];
            expect(result.code).to.be.equal(0);
            done()
        })
    });

    it("提交审批", (done) => {
        console.log(order,"<==========order");
        request({
            url: url + "Order/" + order,
            method: "PUT",
            headers: {
                userName: "JingLiZhiXiang",
                password: "123456"
            },
            json: true,
            body: {
                "type":"order",
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
    });

    // it("创建改签单", (done) => {
    //     console.log(order,"<========order");
    //
    //     request({
    //         url: url + "Order",
    //         method: "POST",
    //         json: true,
    //         headers: {
    //             userName: "JingLiZhiXiang",
    //             password: "123456"
    //         },
    //         body: {
    //             "originalOrderNo": `${order}`,
    //             "flightList":
    //                 [{
    //                     "flightID": `${flightID2}`,
    //                     "departureCity": `${departureCity2}`,
    //                     "arrivalCity": `${arrivalCity2}`,
    //                     "departureDate": `${departureDate2}`,
    //                     "airline": `${airline2}`,
    //                     "cabinType": `${cabinType2}`,
    //                     "flightNo": `${flightNo2}`,
    //                     "price": price2
    //                 }],
    //             "passengerList":
    //                 [{
    //                     "outsidePassengerId": "20171025002",
    //                     "passengerType": "成人",
    //                     "companyId": "S117325",
    //                     "cnName": "张栋",
    //                     "certificatesList":
    //                         [{
    //                             "certType": "身份证",
    //                             "certNumber": "411527199408012773",
    //                             "isFlightCertificate": false
    //                         }],
    //                 }],
    //             "contactList":
    //                 {
    //                     "contactName": "张栋",
    //                     "mobile": "15978561146"
    //                 },
    //             "type": "change",
    //         }
    //     }, (err, res, body) => {
    //         if (err) {
    //             console.log(err);
    //             return
    //         }
    //         let result;
    //         try {
    //             result = res.body
    //         } catch (err) {
    //             result = body
    //         }
    //         console.log(result, "<=======changeOrderResult");
    //         expect(result.code).to.be.equal("10000");
    //         done()
    //     })
    // })

    // it("订单详情", (done) => {
    //     console.log(order[0],"<========order[0]");
    //     request({
    //         url: url + "Order",
    //         json: true,
    //         headers: {
    //             userName:"JingLiZhiXiang",
    //             password:"123456"
    //         },
    //         qs: {
    //             "orderNo": order[0],
    //         }
    //     }, (err, res, body) => {
    //         if (err) {
    //             console.log(err);
    //             return
    //         }
    //         let result;
    //         try {
    //             result = res.body;
    //         } catch (err) {
    //             result = body
    //         }
    //         expect(result.code).to.be.equal("10000");
    //         done()
    //     })
    // });

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




    /*it("取消改签单", (done) => {
        request({
            url: url + "/CancelChangeOrder",
            method:"POST",
            json:"true",
            headers:{
                'content-type': 'application/json'
            },
            body:{}
        },(err,res,body)=>{
            if(err){
                console.log(err);
                return;
            }
            let result;
            try{
                result = res.body
            }catch (err){
                result = body
            }
            console.log(result,"<======result")
            expect(result.code).to.be.equal("10000");
            done()
        })
    })
*/

    /* it("订购单创建退票单", (done) => {
         request({
             url: url + "/CreateReturnOrder",
             method: "POST",
             json: true,
             headers: {
                 'content-type': 'application/json'
             },
             body: {}
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
             console.log(result, "<=====ReturnOrderResult");
             expect(result.code).to.be.equal("10000");
             done()
         })
     })*/

    /*it("取消退票单", (done) => {
        request({
            url: url + "/CancelReturnOrder",
            method: "POST",
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: {}
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
            console.log(result, "<=======CancelReturnOrderResult");
            expect(result.code).to.be.equal("10000");
            done()
        })
    })*/

});


