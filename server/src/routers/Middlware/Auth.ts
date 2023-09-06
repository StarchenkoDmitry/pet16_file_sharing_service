import { Request, Response } from "express";


export const JWT_NAME :string= "JWT_ID"
export const JWT_SIZE: number = 16;

export function JWT_middlware(req:Request, res:Response, next:any){
    // console.log("cookies: ", req.cookies);
    const reqJWT = req.signedCookies[JWT_NAME];
    // console.log("JWT_middlware cookies: ", reqJWT);
    if(typeof reqJWT  !== "string"){
        console.log("JWT is not exist");
        const nJWT = RandomJWTID();
        res.cookie(JWT_NAME, nJWT, { signed:true })
        req.JWTID = nJWT;
        // res.status(400).send({error:"JWT_middlware error"});
    }
    else{
        // res.cookie("Random", "lolx464", { signed:true })
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

