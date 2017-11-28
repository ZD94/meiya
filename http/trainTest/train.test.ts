'use strict';

let request = require("request");

let expect = require("chai").expect;

const url = "http://localhost:3000";

describe("/美亚火车票订票流程", function () {
    this.timeout(5 * 60 * 10000);
    it("get / 查询车次", (done) => {
        let info = {
            "username": "JingLiZhiXiang",
            "password": '123456'
        };
        let str = JSON.stringify(info);
        str = encodeURIComponent(str);
        request({
            url: url + "/searchTrains",
            method: "GET",
            json: true,
            headers: {
                auth: str,
                supplier: "meiya"
            },
            qs: {
                "depCity": '北京',
                "arrCity": '上海',
                "depDate": '2017-12-01',
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
            expect(result.code).to.be.equal(0);
            done()
        })
    });
    //
    // it("检查车票是否能预订", (done) => {
    //     let info = {
    //         "username": "JingLiZhiXiang",
    //         "password": '123456'
    //     };
    //     let str = JSON.stringify(info);
    //     str = encodeURIComponent(str);
    //
    //     request({
    //         url: url + "/check",
    //         method: "GET",
    //         json: true,
    //         headers: {
    //             auth: str,
    //             supplier: "meiya"
    //         },
    //         qs: {
    //             "TrainNumber": "G101",
    //             "DepStation": "北京南",
    //             "ArrStation": "上海虹桥",
    //             "DepDate": "2017-11-28 06:43",
    //             "SeatID": "二等座",
    //             "PassengerNums": 1
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
    //         expect(result.code).to.be.equal(0);
    //         done()
    //     })
    // });
    let order;
    it("创建订单", (done) => {
        let info = {
            "username": "JingLiZhiXiang",
            "password": '123456'
        }
        let str = JSON.stringify(info);
        str = encodeURIComponent(str);
        request({
            url: url + "/orderTrain",
            method: "POST",
            json: true,
            headers: {
                auth: str,
                supplier: "meiya"
            },
            body: {
                "OutSideOrderNo": '20171025002',
                "TrainNumber": 'G1',
                "DepStation": '北京南',
                "DepDate": '2017-11-29 09:00',
                "ArrStation": '上海虹桥',
                "ArrDate": '2017-11-29 13:28',
                "PassengerNums": 1,
                "SeatInfo": {
                    "SeatName": 209,
                    "SeatPrice": 553.00,
                    "IsBookable": true
                },
                "PassengerList": [
                    {
                        "cnName": "张栋",
                        "outsidePassengerId": "20171025002",
                        "certificatesList":
                            [{
                                "certType": "身份证",
                                "certNumber": "411527199408012773",
                                "expiration": ""
                            }]
                    }
                ],
                "ContactList": {
                    "contactName": '张栋',
                    "mobile": '15978561146'
                },
                "type": "order"
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
            order = result.data.OrderNo;
            console.log(order,"<=========order");
            done()
        })
    });
    // it("提交审批", (done) => {
    //     let info = {
    //         "username": "JingLiZhiXiang",
    //         "password": '123456'
    //     }
    //     let str = JSON.stringify(info);
    //     str = encodeURIComponent(str);
    //     console.log(order,"<=========order");
    //     request({
    //         url: url + "/orderTrain/" + order,
    //         method: "PUT",
    //         json: true,
    //         headers: {
    //             auth: str,
    //             supplier: "meiya"
    //         },
    //         body: {
    //             type: "order"
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
    //         console.log(result,"<===============result");
    //         expect(result.code).to.be.equal(0);
    //         done()
    //     })
    // })

    // it("取消订单", (done) => {
    //     let info = {
    //         "username": "JingLiZhiXiang",
    //         "password": '123456'
    //     }
    //     let str = JSON.stringify(info);
    //     str = encodeURIComponent(str);
    //     request({
    //         url: url + "/orderTrain/" + order,
    //         method: "DELETE",
    //         json: true,
    //         headers: {
    //             auth: str,
    //             supplier: "meiya"
    //         },
    //         body: {
    //             "type": "order"
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

    it("订单详情",(done)=>{
        let info = {
            "username": "JingLiZhiXiang",
            "password": '123456'
        };
        let str = JSON.stringify(info);
        str = encodeURIComponent(str);
        request({
            url:url + "/orderTrain/" + order,
            method:"GET",
            headers:{
                auth:str,
                supplier:"meiya"
            },
            qs:{
                "type":"order"
            }
        },(err,res,body)=>{

            if(err){
                console.log(err);
                return
            }
            let result;
            try{
                result = JSON.parse(res.body)
            }catch (err){
                console.log(err);
                result = body
            }
            console.log(result,"<=============result")
            expect(result.code).to.be.equal(0);
            done()
        })
    })
});
































