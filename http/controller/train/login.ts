'use strict';
import {AbstractController, Restful, Router, reply} from "@jingli/restful";
import {login} from 'model/train/agent';

let config = require("@jingli/config");

@Restful()
export class TrainAuthController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true
    }

    async add(req, res, next) {
        console.log(req.body, "<=========req.body");
        let {userName, password} = req.body;
        try {
            let data = await login("JingLiZhiXiang", 'sapg8lYZD70C/dOtKLPJmg==');
            res.json(data)
        } catch (err) {
            console.log(err)
        }
    }
}