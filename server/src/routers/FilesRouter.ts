import { Request, Response, Router } from "express";
import { JWT_middlware } from "./Middlware/JWT.js";
import urlDB from "../services/UrlDB.js";
import { FileDataDB } from "../common/Structures.js";
import fileDB from "../services/FileDB.js";

const filesRouter = Router()

filesRouter.use(JWT_middlware);


filesRouter.post("/addfile/:urlid",async function(req:Request, res:Response)  {
    try{
        const urlid = req.params.urlid;
        const name = req.body.name;
        const size = req.body.size;
        const lastModified = req.body.lastModified;        
        // console.log(`/addfile/${urlid} name(${name}), size:(${size})`);
        
        if(typeof urlid !== "string" || typeof name !== "string" || typeof size !== "number" || 
                typeof lastModified !== "number"){
            res.status(350).json({error:"не коректные данные."});
            return;
        }

        const file :FileDataDB = { 
            name: name,
            size: size,
            lastModified:lastModified,
            bufferID: null,
        }

        const createdFile = await fileDB.Add(file);

        if(createdFile && file.id){
            const fileadded  = await urlDB.AddFile(urlid,file.id);
            if(fileadded){
                res.status(200).json({fileid: file.id});
            }else{
                const deleted = await fileDB.Remove(file.id);
                if(deleted){ 
                    res.status(300).json({error:"fileadded is false"});
                }else{
                    res.status(300).json({
                        error:`/addfile/:urlid(${urlid}), fileID(${file.id}) error: deleted is false`
                    })
                    console.log(`/addfile/:urlid(${urlid}), fileID(${file.id}) error: deleted is false`)
                    return;
                }
            }
        }else{
            res.status(400).json({error:"createdFile is false"});
        }
    }catch(error){
        console.log("addfile error: ",error);
        res.status(500).json({error:"error"});
    }    
});

filesRouter.post("/filesinfo",async function(req:Request, res:Response)  {
    try{
        const filesid: string[] = req.body.filesid;
        // console.log(`/filesinfo`,filesid);
        if(typeof filesid !== "object" || !Array.isArray(filesid)){
            res.status(300).json({error:"body is not valid"})
            return;
        }
        filesid.forEach(t=>{
            if(typeof t !== "string"){
                res.status(300).json({error:"filesid is not valid then a element is not string"})
                return;
            }
        });

        const files : FileDataDB[] = []
        for(let p = 0;p< filesid.length;p++){
            const f= filesid[p];
            const file = await fileDB.Get(f);
            if(file){
                files.push(file);
            }
            else{
                res.status(400).json({error:`file with id(${f}) is not exist or db is bad 345635`})
                return;
            }
        }
        
        res.status(200).json({files:files});

    }catch(error){
        console.log("filesinfo error: ",error);
        res.status(500).json({error:"6796584568568"});
    }    
});

filesRouter.get("/fileinfo/:fileid",async function(req:Request, res:Response)  {
    try{
        const fileid: string = req.params.fileid;
        // console.log(`/fileinfo fileid(${fileid})`);
        if(typeof fileid !== "string"){
            res.status(350).json({error:"fileid is not string"});
            return;
        }

        const file = await fileDB.Get(fileid);
        if(file){
            res.status(200).json(file);
        }else{
            res.status(300).json({error:"file not found."});
        }
    }catch(error){
        console.log(`/fileinfo/:fileid error: `,error);
        res.status(500).json({error:"error"});
    }    
});

filesRouter.post("/deletefile",async function(req:Request, res:Response)  {
    try{
        const urlid: string = req.body.urlid;
        const fileid: string = req.body.fileid;
        // console.log(`/filesinfo urlid(${urlid}) fileid(${fileid})`);
        if(typeof urlid !== "string" || typeof fileid !== "string" ){
            res.status(350).json({error:"urlid or fileid is not string"});
            return;
        }

        const result = await urlDB.DeleteFile(urlid,fileid);
        if(result){
            res.status(200).json();
        }
        else{
            res.status(250).json({error:"file was not deleted"})
        }

    }catch(error){
        console.log("/deletefile error: ",error);
        res.status(500).json({error:"error"});
    }    
});

export default filesRouter;