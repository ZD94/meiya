let Sequelize = require("sequelize");
let config = require("@jingli/config");

export interface Tmc{
    id: string;
    userId: string;
    tmcName:string;
    identity:object;
    createdAt:Date;
    updatedAt:Date;
}



let uuid = require("uuid");

export class Models {
    DB:any;
    tmc: any;
    constructor(){
        console.log("go constructor");
        this.init();
        this.DB.sync({force: false});
    }
    init(){
        let options = {
            timezone: '+08:00'
        }
        let url = config.postgres.url;
        if (/^postgres:\/\/.*ssl=true/.test(url)) {
            options["dialect"] = 'postgres';
            options["dialectOptions"] = { ssl: true };
        }
        this.DB = new Sequelize(url, options);
        this.initTmc();
    }
    initTmc(){
        this.tmc = this.DB.define("tmc" , {
            "id" : { type: Sequelize.UUID, allowNull : false , primaryKey : true },
            "userId": { type : Sequelize.UUID },
            "tmcName" : { type: Sequelize.STRING , allowNull : false },
            "identity" : { type : Sequelize.JSON , allowNull : true },
            "deletedAt": { type: Sequelize.DATE }
        });
    }
    
}

export let Model = new Models();