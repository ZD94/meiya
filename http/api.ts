
/* 登录 */
export interface Login {
    username: string;
    password: string;
    timestamp: string;
}

/* 查询航班 */
export interface QueryFlights {
    departureCity: string;   //城市三字码
    arrivalCity: string;     //城市三字码
    departureDate: string;
    tripType?: number;
    sessionId?: string; //登录返回凭证
}

/* FlightData */
export interface FlightData {
    flightID: string,
    departureCity: string,
    arrivalCity: string,
    departureDate: string,
    airline: string,
    cabinType: string,
    flightNo: string,
    price:number
}


export interface PASSENGER {
    userName?: string;
    mobile?:string;
    email?: string;
    sex?: string;
    nationality?: string;
    certificatesList : {
        certType: string; //证件类型
        certNumber: string; //证件信息
    }[];
}

export interface CONTACTER {
    mobile : string;
    contactName: string;
}

/* 创建订单接收参数 */
export interface CreateOrderParams{
    sessionId?:string,
    outsideOrderNo: string,
    opRemark: string,
    oaSerialnumber: string,
    flightList: FlightData[],
    passengerList: PASSENGER[],
    contactList: CONTACTER[],
}

//价格校验
export interface CheckPriceParams{
    sessionId:string,
    orderNo: string
}

export enum OrderStatus {
    WAITCOMMIT = 0,   //待提交
    AUDIT      = 1,   //审核中
    SENDED     = 2,   //已提交审核
    TICKET     = 3,   //出票中
    TICKETED   = 4    //已出票
}


/* 获取订单列表 */
export interface OrderList {
    sessionId: string;
    pageSize?: number;
    pageIndex?: number;
    status?: OrderStatus;   //应该是一个枚举
}

//获取订单详情
export interface GetOrderInfo{
    sessionId:string,
    orderNo: string,
}

//取消订单
export interface CancelOrder{
    orderNo: string,
    cancelReason?: string,
    id:string
}

//提交审批
export interface SubmitOrder{
    sessionId:string,
    orderNo: string,
}



/*  =================== 改签部分 =================  */
/* 创建改签单 */
export interface CreateChangeOrder{
    sessionId:string,
    orderNo: string,
    remark?: string,
    flightList: FlightData[],
    passengerList:PASSENGER[],
    contactList: CONTACTER[]
}

/* 取消改签单 */
export interface CancelChangeOrder{
    orderNo: string,
    cancelReasonId:number,
    cancelReason: string,
    sessionId:string
}

/* 获取改签单列表 */
export interface ChangeOrderList {
    sessionId: string;
    status?: ChangeOrderStatus;
    pageIndex?: number;
    pageSize? : number;
}

export enum ChangeOrderStatus {
    WAITSUBMIT = 0,
    SUMBIT     = 1
}

/* 获取改签详情 */
export interface ChangeOrderInfo {
    sessionId: string;
    orderNo: string;
}

/* 提交改签审批 */
export interface ChangeOrderSubmit {
    sessionId: string;
    orderNo:   string;
}



/* ====================== 退票 ================== */
export enum RETURNTYPE {
    ORIGINORDER = 0,
    CHANGEORDER = 1
}

export interface ReturnOrderCreate{
    sessionId: string;
    orderNo:   string;
    returnType: RETURNTYPE;
    passengerList: PASSENGER[];
    contactList: CONTACTER[];
    segmentList : number[];      //对应的订单创建 flightlist, 从订单详情中获取
}

export interface ReturnOrderSubmit {
    sessionId: string;
    orderNo:   string;
}

export interface ReturnOrderList {
    sessionId: string;
    status   : string;
    pageIndex: number;
    pageSize : number;
}

export interface ReturnOrderInfo {
    sessionId: string;
    orderNo  : string;
}

export interface ReturnOrderDelete {
    sessionId: string;
    orderNo  : string;
}