'use strict';

let request = require("request");

let expect = require("chai").expect;

const url = "http://localhost:3000/";

describe('/美亚订票流程', function () {
    let sessionId;
    this.timeout(5 * 60 * 10000);

    let data, flightID, departureCity, arrivalCity, departureDate, airline, cabinType, flightNo, price;
    let data2, flightID2, departureCity2, arrivalCity2, departureDate2, airline2, cabinType2, flightNo2, price2;
    // it("get /查询航班", (done) => {
    //
    //     let info = {
    //         username: "JingLiZhiXiang",
    //         password: "123456"
    //     };
    //
    //     let str = JSON.stringify(info);
    //     str = encodeURIComponent(str);
    //
    //     request({
    //         url: url + "SearchFlight",
    //         method: 'GET',
    //         json: true,
    //         headers: {
    //             auth: str,
    //             supplier: "meiya"
    //         },
    //         qs: {
    //             "departureCode": "PEK",
    //             "arrivalCode": "SHA",
    //             "depDate": "2017-12-25",
    //             supplier: "meiya",
    //             tripType: 1
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
    //         data = result.data[1];
    //         flightID = data["flightPriceInfoList"][0].flightID;
    //         departureCity = data.orgAirportCode;
    //         arrivalCity = data.desAirportCode;
    //         departureDate = data.depDate;
    //         airline = data.airline;
    //         cabinType = data.flightPriceInfoList[0].cabinType;
    //         flightNo = data.flightNo;
    //         price = Number(data.flightPriceInfoList[0].ticketPrice);
    //
    //         data2 = result.data[2];
    //         flightID2 = data["flightPriceInfoList"][0].flightID;
    //         departureCity2 = data.orgAirportCode;
    //         arrivalCity2 = data.desAirportCode;
    //         departureDate2 = data.depDate;
    //         airline2 = data.airline;
    //         cabinType2 = data.flightPriceInfoList[0].cabinType;
    //         flightNo2 = data.flightNo;
    //         price2 = Number(data.flightPriceInfoList[0].ticketPrice);
    //         expect(result.code).to.be.equal(0);
    //         done()
    //     })
    // });

    let order;
    it("/创建订单", (done) => {
        let info = {
            username: "JingLiZhiXiang",
            password: "123456"
        };

        let str = JSON.stringify(info);
        str = encodeURIComponent(str);
        console.log(str,"<=========str");
        request({
            url: url + "Order",
            method: 'POST',
            json: true,
            headers: {
                auth: str,
                supplier: "meiya"
            },
            body: {
                "flightList":
                    [{
                        "flightID": "9a425aca78654f0a94689ff7481f9734_5ee809663cf84e15b1037f40dd4c3843_11",
                        "departureCode":"PEK",
                        "arrivalCode": "SHA",
                        "depDate": "2017-12-05",
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

        let info = {
            username: "JingLiZhiXiang",
            password: "123456"
        };

        let str = JSON.stringify(info);
        str = encodeURIComponent(str);

        request({
            url: url + "Order/" + order,
            method: "PUT",
            headers: {
                auth: str,
                supplier: "meiya"
            },
            json: true,
            body: {
                "type": "order",
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
            expect(result.code).to.be.equal(0);
            done()
        })
    });
    //
    it("订单详情", (done) => {
        let info = {
            username: "JingLiZhiXiang",
            password: "123456"
        };

        let str = JSON.stringify(info);
        str = encodeURIComponent(str);
        request({
            url: url + "Order/" + order,
            method: "GET",
            json: true,
            headers: {
                auth: str,
                supplier: "meiya"
            },
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
            expect(result.code).to.be.equal(0);
            done()
        })
    });
    //
    // /*
    //     it("取消订单", (done) => {
    //         request({
    //             url: url + "Order/" + order,
    //             method: "DELETE",
    //             json: true,
    //             headers: {
    //                 userName: "JingLiZhiXiang",
    //                 password: "123456"
    //             },
    //             body: {
    //                 "type": "order",
    //             }
    //         }, (err, res, body) => {
    //             if (err) {
    //                 console.log(err);
    //                 return
    //             }
    //             let result;
    //             try {
    //                 result = res.body
    //             } catch (err) {
    //                 result = body
    //             }
    //             expect(result.code).to.be.equal(0);
    //             done()
    //         })
    //     });
    // */
    //
    // it("订单列表", (done) => {
    //     request({
    //         url: url + "Order",
    //         json: true,
    //         headers: {
    //             userName: "JingLiZhiXiang",
    //             password: "123456"
    //         },
    //         method: "GET"
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
    //         expect(result.code).to.be.equal(0);
    //         done()
    //     })
    // });
    //
    // /************************************************************/
    //
    // it("创建改签单", (done) => {
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
    //                     "departureCode": `${departureCity2}`,
    //                     "arrivalCode": `${arrivalCity2}`,
    //                     "depDate": `${departureDate2}`,
    //                     "airline": `${airline2}`,
    //                     "cabinType": `${cabinType2}`,
    //                     "flightNo": `${flightNo2}`,
    //                     "price": price2
    //                 }],
    //             "passengerList":
    //                 [{
    //                     "name": "张栋",
    //                     "mobile": "15978561146",
    //                     "passengerType": "1",
    //                     "companyId": "S117325",
    //                     "certificatesList": [{
    //                         "certType": "身份证",
    //                         "certNumber": "411527199408012773"
    //                     }]
    //                 }],
    //             "contactList":
    //                 {
    //                     "name": "张栋",
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
    //         expect(result.code).to.be.equal(0);
    //         done()
    //     })
    // })

    /*
    it("订购单创建退票单", (done) => {
        request({
            url: url + "Order",
            method: "POST",
            json: true,
            headers: {
                userName: "JingLiZhiXiang",
                password: "123456"
            },
            body: {
                "originalOrderNo": `${order}`,
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
                "type": "return",
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
            console.log(result, "<=====ReturnOrderResult");
            expect(result.code).to.be.equal(0);
            done()
        })
    })
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


