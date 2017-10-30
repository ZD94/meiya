/**
 * Created by hxs on 2017/10/30.
 */

'use strict';
import {AbstractController, Restful, Router} from "@jingli/restful";

@Restful()
export class TestController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async get(req, res, next) {
        console.log("ok");
        res.json(this.reply(0, null));
    }

    async find(req, res, next) {
        console.log("find ok.");
        res.json(this.reply(0, {msg:"find ok."}));
    }
}