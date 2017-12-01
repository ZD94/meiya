let config = require("@jingli/config");
import {proxyHttp, transAttributeName} from "../../http/util";
import {reply, ReplyData} from "@jingli/restful";
import cache from "@jingli/cache";

export async function getCityList(query): Promise<{ code: number, msg: string, data?: any }> {
    let params = {
        url: `${config.meiyaHotelUrl}` + "/getCityList",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST"  
    };
    
    let datas = await proxyHttp(params);
    if (datas.d.code == '10000') {
        return {
            code: 0,
            data: datas.d.cityList,
            msg: 'ok'
        }
    } else {
        return {
            code: 502, 
            data: null,
            msg: 'failed'
        }
    }
}

export async function searchHotel(query): Promise<ReplyData> {

    let testArr = [
        {
            newname: 'cityCode',
            oldname: 'city'
        }
    ];
    let querys = transAttributeName(query, testArr);
    let params = {
        url: `${config.meiyaHotelUrl}` + "/queryHotels",
        body: {
            request: querys
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST" 
    };
    // console.log('query', querys);
    let datas = await proxyHttp(params);
    let itemsChange = [
        {
            newname: 'hotelId',
            oldname: 'hotelCode'
        },
        {
            newname: 'cnName',
            oldname: 'hotelCNName'
        },
        {
            newname: 'enName',
            oldname: 'hotelENName'
        },
        {
            newname: 'address',
            oldname: 'hotelAddress'
        },
        {
            newname: 'starRating',
            oldname: 'starCode'
        },
        {
            newname: 'mobile',
            oldname: 'hotelPhone'
        }
    ];
    

    // console.log(datas.d);
    
    // console.log(JSON.stringify(datas.d.hotelInfoList));

    if (datas.d.code == '10000') {
        for (let items of datas.d.hotelInfoList) {
        transAttributeName(items, itemsChange);
        }
        return reply(0, datas.d.hotelInfoList);
    } else {
        return reply(502, datas.d.description);
    }
}

export async function getHotelDetail(query): Promise<ReplyData> {
    let testArr = [
        {
            newname: 'hotelCode',
            oldname: 'hotelId'
        }
    ];
    transAttributeName(query, testArr);

    let params = {
        url: `${config.meiyaHotelUrl}` + "/getHotelDetail",
        body: {
            request: query
        },
        header: {
            'content-type': 'application/json'
        },
        method: "POST" 
    };

    let itChange = [
        {
            newname: 'priceNow',
            oldname: 'price'
        },
        {
            newname: 'dateNow',
            oldname: 'sellDate'
        }
    ];

    let iteChange = [
        {
            newname: 'roomPlanId',
            oldname: 'ratePlanID'
        },
        {
            newname: 'supplierId',
            oldname: 'supplierCode'
        },
        {
            newname: 'cancelOrderTerm',
            oldname: 'termCancelDescription'
        },
        {
            newname: 'datePriceList',
            oldname: 'priceList'
        }
    ];

    let itemChange = [
        {
            newname: 'roomId',
            oldname: 'roomCode'
        },
        {
            newname: 'hasInternet',
            oldname: 'intent'
        }
    ];

    // let datas = await proxyHttp(params);
    let datas = {
        "d": {
          "__type": "Meiya.Trip.Model.API.GetHotelDetailResponse",
          "hotelInfo": {
            "hotelCode": "20421691",
            "hotelCNName": "深圳福青龙华天假日酒店",
            "hotelENName": "",
            "otherName": "",
            "hotelUrl": "",
            "hotelAddress": "福田区彩田南路2030号与福华三路交汇处(地铁罗宝线岗厦站D出口)",
            "hotelOpeningTime": null,
            "starCode": 4,
            "hotelDecorationTime": null,
            "RecommendCode": "",
            "hotelBusinessCircle": null,
            "hotelPictureList": [
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/8822f53d47e161c1e8deb87290dd817b.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/8f0a311fc6247304522fc2bc75c5a8f0.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/26883cbe0ec647fe55e8c5865897e24f.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/70ea163ba401a8163ef0980ecf21a414.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/63f8cb215d168d3b61bdf8218516c4be.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/20a33c473539ce0da220d23a049917f4.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/f729cb76bdb0c6aa804629d020e6c1ba.jpg",
                "description": null
              },
              {
                "hotelCode": null,
                "imageName": "",
                "isMain": null,
                "url": "http://devimg2.shinetour.com/image3app/i/API350_350/b6c5f6974bcee95881b2739b94314aa5.jpg",
                "description": null
              }
            ],
            "postalCode": "",
            "longitude": "114.075345000",
            "latitude": "22.537893000",
            "hotelPhone": "0755-82999888",
            "hotelFax": "0755-82991616",
            "groupName": "",
            "hotelBrand": null,
            "supportCARDSCodeList": null,
            "generalAmenities": null,
            "roomAmenities": null,
            "recreationAmenities": null,
            "conferenceAmenities": null,
            "diningAmenities": null,
            "description": "",
            "location": "",
            "hotelRoomList": [
              {
                "roomCode": "H651489$BycNdvAAi0eFHR8mwCz0Kw==@130013",
                "roomName": "标准双人间(有窗)",
                "fooler": "6-16",
                "acre": "35",
                "bedType": "双床",
                "intent": "宽带免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "BycNdvAAi0eFHR8mwCz0Kw==@1200",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 515,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 515,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "BycNdvAAi0eFHR8mwCz0Kw==@1310",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "单早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 563,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 563,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "BycNdvAAi0eFHR8mwCz0Kw==@1222",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "双早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 627,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 627,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$BycNdvAAi0eFHR8mwCz0Kw==@1929787",
                "roomName": "标准双人房(有窗)",
                "fooler": "0",
                "acre": "35-40",
                "bedType": "双床",
                "intent": "宽带收费:035002",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "BycNdvAAi0eFHR8mwCz0Kw==@32328",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 533,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 545,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$kAn9uDaMGY65aTuzAmiRuQ==@1911892595",
                "roomName": "标准双人间(有窗)",
                "fooler": "6-13层",
                "acre": "",
                "bedType": "双床",
                "intent": "",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "kAn9uDaMGY65aTuzAmiRuQ==@81769624",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 575,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 575,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "kAn9uDaMGY65aTuzAmiRuQ==@81767486",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 575,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 575,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "kAn9uDaMGY65aTuzAmiRuQ==@81767488",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "单早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 629,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 629,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "kAn9uDaMGY65aTuzAmiRuQ==@81769627",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "单早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 629,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 629,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$faVt391XZSYWvFUDmlzaAQ==@92419621_0001",
                "roomName": "标准双人间",
                "fooler": "6-13",
                "acre": "35",
                "bedType": "双床",
                "intent": "宽带,免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92419621_12425139",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 616,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 616,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$faVt391XZSYWvFUDmlzaAQ==@90852195_0007",
                "roomName": "标准双人间",
                "fooler": "6-13",
                "acre": "35",
                "bedType": "双床",
                "intent": "宽带,免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@90852195_7346752",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "双早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 623,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 623,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "22003028$0002",
                "roomName": "标准双人间",
                "fooler": "6-13",
                "acre": "35",
                "bedType": "双床1.35米",
                "intent": "免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "12425139@0001",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "不含早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 654.38,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 654.38,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在10.01.01 到50.12.31期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "7346752@0007",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "含双早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 661.05,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 661.05,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在16.03.25 到50.12.30期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$faVt391XZSYWvFUDmlzaAQ==@92348870_0001",
                "roomName": "标准单人间",
                "fooler": "6-13,16",
                "acre": "35",
                "bedType": "大床",
                "intent": "宽带,免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896713",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 668,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 668,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896720",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "单早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 721,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 721,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896725",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "双早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 774,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 774,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$faVt391XZSYWvFUDmlzaAQ==@92348870_0002",
                "roomName": "行政单人间",
                "fooler": "14-15",
                "acre": "40",
                "bedType": "大床",
                "intent": "宽带,免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896713",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "无早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 680,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 680,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896720",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "单早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 731,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 731,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@92348870_11896725",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "双早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 785,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 785,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "22003028$0001",
                "roomName": "标准单人间",
                "fooler": "6-13,16",
                "acre": "35",
                "bedType": "大床1.8米",
                "intent": "免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "11896713@0001",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "不含早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 709.93,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 709.93,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在10.01.01 到50.12.31期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "11896720@0001",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "含单早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 765.48,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 765.48,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在10.01.01 到50.12.31期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "11896725@0001",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "含双早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 821.03,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 821.03,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在10.01.01 到50.12.31期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "22003028$0005",
                "roomName": "豪华行政套间",
                "fooler": "6-16",
                "acre": "60",
                "bedType": "大床1.8米",
                "intent": "免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "8312380@0005",
                    "supplierCode": "ELONG",
                    "payType": "2",
                    "hasBreakfast": "不含早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 809,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 809,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": true,
                    "garanteeDescription": "担保条件：在17.08.25至60.12.31在店需要您提供信用卡担保。客人入住日前1天12:00点前可以变更取消，之后无法变更取消，如未入住，将扣除第一晚房费作为违约金。",
                    "termCancelDescription": "",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "182507@0005",
                    "supplierCode": "ELONG",
                    "payType": "2",
                    "hasBreakfast": "含双早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 839,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 839,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": true,
                    "garanteeDescription": "担保条件：在17.08.25至60.12.31在店需要您提供信用卡担保。客人入住日前1天12:00点前可以变更取消，之后无法变更取消，如未入住，将扣除第一晚房费作为违约金。",
                    "termCancelDescription": "",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "7350352@0010",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "含双早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 961.02,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 961.02,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在16.03.25 到50.12.30期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  },
                  {
                    "ratePlanID": "14796520@0003",
                    "supplierCode": "ELONGYF",
                    "payType": "1",
                    "hasBreakfast": "不含早",
                    "priceType": null,
                    "currency": "CNY",
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 976.57,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 976.57,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "预付规则：在10.01.01 到50.12.31期间入住，需要提供信用卡预付全额房费。一经预订成功不可变更/取消。",
                    "invStatus": false
                  }
                ]
              },
              {
                "roomCode": "H651489$faVt391XZSYWvFUDmlzaAQ==@90852195_0010",
                "roomName": "豪华行政套间",
                "fooler": "6-16",
                "acre": "60",
                "bedType": "大床",
                "intent": "宽带,免费",
                "status": null,
                "extra": null,
                "facilities": "",
                "description": null,
                "remark": null,
                "roomImgUrl": "",
                "hotelPriceList": [
                  {
                    "ratePlanID": "faVt391XZSYWvFUDmlzaAQ==@90852195_7350352",
                    "supplierCode": "QianTao",
                    "payType": "1",
                    "hasBreakfast": "双早",
                    "priceType": null,
                    "currency": null,
                    "priceList": [
                      {
                        "sellDate": "2017-12-19",
                        "price": 905,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      },
                      {
                        "sellDate": "2017-12-20",
                        "price": 905,
                        "priceRebate": 0,
                        "priceServiceAmount": 0
                      }
                    ],
                    "priceRebate": 0,
                    "isGaranteeRule": false,
                    "garanteeDescription": null,
                    "termCancelDescription": "不可退订",
                    "invStatus": false
                  }
                ]
              }
            ],
            "strHotelTrafficInformation": null
          },
          "code": "10000",
          "description": "请求成功"
        }
      };
    if (datas.d.code == '10000') {
        for (let item of datas.d.hotelInfo.hotelRoomList) {
            if (!item.hotelPriceList) {continue;}
            for (let ite of item.hotelPriceList) {
                if (!ite.priceList) {continue;}
                for (let it of ite.priceList) {
                    transAttributeName(it, itChange);
                }
                transAttributeName(ite, iteChange);
            }
            transAttributeName(item, itemChange);
        }
        return reply(0, datas.d.hotelInfo);
    } else {
        return reply(502, datas.d.description);
    }
}