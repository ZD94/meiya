"use strict";
import {AbstractController, Restful, Router, reply} from "@jingli/restful"
import {search} from "model/train/search"

@Restful()
export class seartTrainsController extends AbstractController {
    constructor() {
        super()
    }

    $isValidId(id: string) {
        return true
    }

    async find(req, res, next) {
        let data: any;
        try {
            data = await search(req);
            res.json(data)
        } catch (e) {
            console.log(e)
        }

    }
}