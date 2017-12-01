'use strict';
import {AbstractController, Restful, Router} from '@jingli/restful';
import {handleMYNotification} from 'model/notification'

let num = 0;
@Restful()
export class MYNotificationController extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return true;
    }

    async $before(req, res, next) {
        num++;
        next();
    }

    async find(req, res, next){

        res.json({
            "msg":"ok",
            code:0,
            data:req.query || {}
        })
    }

    async add(req, res, next) {
        let query = req.body;
        let data: any;
        try {
            data = await handleMYNotification(query, num);
            res.json(data); 
        } catch(err) {
            console.log(err);
        }
    }
}