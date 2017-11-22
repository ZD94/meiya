'use strict';

let request = require("request");

let expect = require("chai").expect;

const url = "http://localhost:3000/";

describe("/美亚火车票订票流程", function () {
    this.timeout(5 * 60 * 10000);

    it("get / 查询车次",(done)=>{
        let info = {
            "userName": "JingLiZhiXiang",
            "password": 'sapg8lYZD70C/dOtKLPJmg=='
        }
        let str = JSON.stringify(info);
        str = encodeURIComponent(str);

        request({
            url:url + "seartTrains",
            method:"GET",
            json:true,
            headers:{
                auth:str,
                supplier:"meiya"
            },
            qs:{
                "depCity": '北京',
                "arrCity": '上海',
                "depDate": '2017-11-28',
            }
        },(err,res,body)=>{
            if(err){
                console.info(err);
                return
            }
            let result;
            try {
                result  = res.body
            }catch (err){
                result = body
            }
            expect(result.code).to.be.equal(0);
            done()

        })

    })





});