import { Request, Response, Router } from "express";
import { JWT_middlware } from "./Middlware/JWT.js";
import urlDB from "../services/UrlDB.js";
import { UrlDataDB } from "../common/Structures.js";
import { MAX_NAME_URL_LENGTH } from "../common/Constanter.js";

const urlsRouter = Router()
urlsRouter.use(JWT_middlware);


urlsRouter.get('/myurls',async function(req:Request, res:Response)  {
    try{
        // console.log(`/myurls JWTID(${req.JWTID})`);
        const IDs = await urlDB.GetIDsByUserJWTID(req.JWTID);
        res.status(200).send({ urls : IDs })
    }catch(error){
        console.log(`myurls (JWTID:${req.JWTID}) error: ${error}`);
        res.status(400).send({error:"error"})
    }
});

urlsRouter.get('/myurlsinfo',async function(req:Request, res:Response)  {
    try{
        // console.log(`/myurlsinfo JWTID(${req.JWTID})`);

        const urlsid = await urlDB.GetIDsByUserJWTID(req.JWTID);
        if(!urlsid){
            res.status(300).json({error:"/myurlsinfo urlsid is not exist. 3460234897086346"})
            return;
        }

        const urlsinfo : UrlDataDB[] = [];
        for(let p =0;p < urlsid.length;p++){
            const u = urlsid[p];
            const info = await urlDB.Get(u);
            if(info){
                urlsinfo.push(info);
            }else{
                res.status(300).json({error:"/myurlsinfo info is not exist. 898968965796796697"})
                return;
            }
        }

        res.status(200).json({ urlsinfo : urlsinfo })
    }catch(error){
        console.log(`myurls (JWTID:${req.JWTID}) error: ${error}`);
        res.status(400).json({error:"/myurls чёта не робит 4053405"})
    }
});



urlsRouter.post('/create_url',async function(req:Request, res:Response)  {
    try{
        // console.log("/create_url");
        const name: string = req.body.name;
        if(typeof name !== "string"){
            res.status(300).json({error: "name is not string."})
            return;
        }

        if(name.length === 0 || name.length > MAX_NAME_URL_LENGTH ){
            res.status(300).json({error:`name length is zero or bigger then ${MAX_NAME_URL_LENGTH}. 45654698356983`});
            return;
        }

        const urldata : UrlDataDB  = {filesID:[], JWTID: req.JWTID, name:name};
        const result = await urlDB.Add(urldata);
        if(result && urldata.id){
            res.status(200).json({ urlid : urldata.id })
        }else{
            res.status(300).json({error:"3498560942386092840m"});
        }
    }catch(error){
        console.log(`create_url (JWTID:${req.JWTID}) error: ${error}`);
        res.status(400).json({error:"/create_url чёта не робит 35534765856856868"})
    }
});

urlsRouter.post('/delete_url',async function(req:Request, res:Response)  {
    try{
        console.log("/delete_url");
        const id: string = req.body.id;
        if(typeof id !== "string"){
            res.status(300).json({error:"id is not string"});
        }
        
        const result = await urlDB.Delete(id);
        if(result){
            res.status(200).json({ id:id })
        }else{
            res.status(300).json({error:"58679579857579"});
        }
    }catch(error){
        console.log("/delete_url error: ",error);
        res.status(400).json({error:"/delete_url чёта не робит 8678678957959679"})
    }
});

urlsRouter.get('/info_url/:urlid',async function(req:Request, res:Response)  {
    try{
        const urlid:string = req.params.urlid;
        // console.log("/info_url/:urlid", urlid);       
        if(typeof urlid !== "string"){
            res.status(300).json({error:"urlid is not string"})
            return;
        }
        if(urlid.length === 0) {
            res.status(300).json({error:"length urlid is zero"})
            return;
        }
        const info_url = await urlDB.Get(urlid);
        if(info_url){
            res.status(200).json(info_url);
        }else{
            res.status(300).json();
        }
    }catch(error){
        console.log("/info_url error: ",error);
        res.status(400).json({error:"/info_url чёта не робит 6575675483 " + error})
    }
});


export default urlsRouter;