/**
 * Created by hxs on 2017/10/31.
 */

'use strict';
import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {login} from 'model/flight/agent';

let config = require("@jingli/config");

@Restful()
export class AuthController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async add(req, res, next) {
        let {userName, password} = req.body;
        try{
            let data = await login(userName, password);
            res.json(data);
        }catch (err){
            console.log(err)
        }
    }
}
