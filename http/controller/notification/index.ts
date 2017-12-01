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