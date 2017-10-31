/**
 * Created by hxs on 2017/10/30.
 */

'use strict';
import {Restful, Router, Reply} from "@jingli/restful";

@Restful()
export class TestController{
    constructor() {
    }

    $isValidId(id: string) {
        return true;
    }

    async get(req, res, next) {
        console.log("ok");
        res.json(Reply(0, null));
    }

    async find(req, res, next) {
        console.log("find ok.");
        res.json(Reply(0, {msg:"ok"}));
    }
}