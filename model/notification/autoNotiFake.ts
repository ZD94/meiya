'use strict';
import {handleMYNotification} from './index';
import {fake_data} from '@jingli/config';



let queryHotel = {
    password: '96c1980127269051fd56b3d9c3c8498a1eddc72e',
    timeStamp: '20181111',
    msgType: 'HBOrderInfo',
    data: {
        tripID: '',
        onBusiness: '因公',
        shineTourPolicy: null,
        outsideOrderNo: 'Tb0123456',
        orderNo: 'HB6666666666',
        originalOrderNo: '',
        opName: 'JingLiZhiXiang',
        opDate: '2017-12-07 21:53',
        opStaffCode: '13810529805',
        statusText: '已成交',
        orderType: 5,
        productType: 2,
        issueDate: '2017-12-07 21:56',
        oaSerialnumber: null,
        stApplyOrderNo: '',
        pnr: '171207215400928',
        affiliateBusinessName: '广州尚途商旅信息技术有限公司',
        hotelProduct: {
          orderNo: 'HB6666666666',
          hotelCode: '20416776',
          hotelName: '山水时尚酒店(深圳华南城店)',
          roomCode: 'H648117$3jFQoeJud5s9ojRB5KPZ/Q==@35143574_2745045',
          roomName: '豪华双人房(有窗)',
          cityCode: 'c17597',
          cityName: '深圳',
          checkInDate: '2017-12-14',
          checkOutDate: '2017-12-15',
          payType: 0,
          garanteeRule: null,
          payRule: '不可退订'
        },
        hotelPriceList: [
          {
            orderNo: 'HB6666666666',
            sellDate: '2017-12-14',
            roomCount: 1,
            price: 200,
            foodPrice: 0,
            bedPrice: 0,
            servicePrice: 0,
            rebatePrice: 0
          }
        ],
        passengerList: [
          {
            orderNo: 'HB6666666666',
            passengerNo: 1,
            passengerCode: 'P351859',
            passengerName: '王二',
            gender: '女',
            nationality: 'CN',
            certificateType: '身份证',
            certificateID: '',
            passengerType: '成人',
            birthday: '1992-03-26',
            reasonID: 0,
            reasonRemark: null,
            ticketNo: '1',
            staffCode: '15011361999'
          }
        ],
        costList: [
          {
            remark: '',
            orderNo: 'HB6666666666',
            passengerCode: 'P351859',
            passengerName: '王二',
            costId: 3728,
            costCenterName: '测试成本中心',
            amount: 802
          }
        ],
        contactInfo: {
          orderNo: 'HB6666666666',
          contactName: '董娜',
          mobile: '13811595192',
          phone: '',
          email: ''
        }
    }
};

let queryFlight = {
    password: '96c1980127269051fd56b3d9c3c8498a1eddc72e',
    timeStamp: '20181111',
    msgType: 'TBOrderInfo', 
    data: {
        outsideOrderNo: '',
        orderNo: 'TB1700205592',
        originalOrderNo: '',
        opName: '王鹏',
        opDate: '2017-12-07 10:02',
        statusText: '待提交',
        orderType: 1,
        productType: 1,
        issueDate: '0001-01-01 00:00',
        oaSerialnumber: null,
        stApplyOrderNo: '',
        pnr: 'JS0H88',
        affiliateBusinessName: '广州尚途商旅信息技术有限公司',
        segmentList: [
          {
            orderNo: 'TB1700205592',
            cabin: '1',
            clazz: 'T',
            planeType: '73E',
            airlineCode: 'FM',
            segmentNo: 1,
            flightNo: 'FM9106',
            originName: '首都国际机场',
            destinationName: '虹桥国际机场',
            departureDate: '2018-01-02',
            departureTime: '20:40',
            arrivalDate: '2018-01-02',
            arrivalTime: '22:50',
            flyTime: '130',
            carrier: '',
            stopItem: '',
            originCityCode: 'PEK',
            destinationCityCode: 'SHA',
            origincityName: '北京(首都)',
            destinationCityName: '上海(虹桥)',
            depTerminal: 'T2',
            arrTerminal: 'T2',
            airlineName: '上海航空',
            remark: ''
          }
        ],
        priceList: [
          {
            orderNo: 'TB1700205592',
            passengerType: '成人',
            price: 430,
            returnprice: 0,
            tax: 50,
            serviceAmount: 0,
            discount: 34.7
          }
        ],
        passengerList: [
          {
            orderNo: 'TB1700205592',
            passengerNo: 1,
            passengerCode: 'P351813',
            passengerName: '张栋',
            gender: '男',
            nationality: 'CN',
            certificateType: '身份证',
            certificateID: '411527199408012773',
            passengerType: '成人',
            birthday: '1994-08-01',
            reasonID: 0,
            reasonRemark: null,
            ticketNo: null,
            staffCode: '20171025002'
          }
        ],
        costList: [
          
        ],
        contactInfo: {
          orderNo: 'TB1700205592',
          contactName: '张栋',
          mobile: '15978561146',
          phone: '',
          email: ''
        }
    }
};

let queryTrain = {
    password: '96c1980127269051fd56b3d9c3c8498a1eddc72e',
    timeStamp: '20181111',
    msgType: 'RBOrderInfo', 
    data: {
        outsideOrderNo: '20171025002',
        tripNo: '',
        orderNo: 'RB1700200756',
        originalOrderNo: '',
        opDate: '2017-12-07T11:16:39.067',
        opName: 'JingLiZhiXiang',
        opStaffCode: '13810529805',
        statusText: '暂缓订单',
        orderType: 70,
        productType: 3,
        issueDate: '0001-01-01T00:00:00',
        oaSerialnumber: null,
        stApplyOrderNo: '',
        pnr: '',
        affiliateBusinessName: null,
        ticketTrain: {
          OrderNo: 'RB1700200756',
          TrainNumber: 'G101',
          FromStation: '北京南',
          ToStation: '上海虹桥',
          DepartureTime: '2017-12-10 06:43',
          ArriveTime: '2017-12-10 12:39',
          TrainType: null,
          SeatLevel: '二等座'
        },
        trainPriceList: [
          {
            orderNo: 'RB1700200756',
            passengerCode: 1,
            price: 0,
            serviceAmount: 6
          }
        ],
        passengerList: [
          {
            orderNo: 'RB1700200756',
            passengerNo: 1,
            passengerCode: 'P351813',
            passengerName: '张栋',
            gender: '男',
            nationality: 'CN',
            certificateType: '身份证',
            certificateID: '411527199408012773',
            passengerType: '成人',
            birthday: '1994/8/1 0:00:00',
            reasonID: 0,
            reasonRemark: null,
            ticketNo: null,
            staffCode: '20171025002'
          }
        ],
        contactInfo: {
          orderNo: null,
          contactName: null,
          mobile: '',
          phone: '',
          email: ''
        },
        costList: []
    } 
};

setInterval(function() {
  if (fake_data) {
    handleMYNotification(queryHotel, 666); 
    handleMYNotification(queryFlight, 888);
    handleMYNotification(queryTrain, 999);
  }
}, 1000 * 60 * 1);