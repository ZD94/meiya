'use strict';

import request = require("request");

let expect = require("chai").expect;

const url = "http://121.41.36.97:6005/API.svc";

describe('/美亚订票流程', function () {

    this.timeout(5000);
    before((done) => {
        request.get({
            url: url + '/login',
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err);
                return;
            }
            let result;
            try {
                result = JSON.parse(body)
            } catch (e) {
                result = body
            }
            console.log(result);

            expect(result.code).to.be.equal(0);
        })
    });

    it("get /queryFlights", (done) => {

    })

});

