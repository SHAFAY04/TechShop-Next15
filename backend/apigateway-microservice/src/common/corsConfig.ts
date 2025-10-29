
import { whitelist } from "./whitelist"
import e from "express"

export const corsOptions={
    origin:function(origin,callback){
        if( whitelist.indexOf(origin)!==-1 || !origin  ){
            callback(null,true)
        }
        else{
            callback(new Error('not allowed by CORS!'))
        }
    },
    credentials:true,
    optionsSuccessStatus:200
}