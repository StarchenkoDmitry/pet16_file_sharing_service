import { Request, Response } from "express";


export const JWT_NAME :string= "JWT_ID"
export const JWT_SIZE: number = 16;

export function JWT_middlware(req:Request, res:Response, next:any){
    const reqJWT = req.signedCookies[JWT_NAME];
    if(typeof reqJWT  !== "string"){
        // console.log("JWT is not exist");
        const nJWT = RandomJWTID();
        res.cookie(JWT_NAME, nJWT, { signed:true })
        req.JWTID = nJWT;
    }
    else{
        // res.cookie("Test1", "value1", { signed:true })
        req.JWTID = reqJWT;
    }
    next();
}


function RandomJWTID(): string{
    let str = "";
    for(let p = 0;p< JWT_SIZE;p++){
        str += Math.round((Math.random()*9)).toString();
    }
    return str;
}


declare global {
    namespace Express {
        // Inject additional properties on express.Request
        interface Request {
            JWTID: string;
            rawBody: Buffer;
        }
    }
}

