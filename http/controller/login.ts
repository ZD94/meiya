/**
 * Created by hxs on 2017/10/31.
 */

'use strict';
import {AbstractController, Restful, Router} from "@jingli/restful";
import {Login} from "http/interface";
@Restful()
export class AuthController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    @Router("/login")
    async other(req, res, next){
        let {username, password, timestamp} = req.body;
        
        res.send("good")
    }
}