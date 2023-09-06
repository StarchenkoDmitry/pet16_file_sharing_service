import e, { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { JWT_middlware } from "./Middlware/Auth.js";
import db from "../services/db/db.js";
import { Binary, ObjectId } from "mongodb";
import urlDB from "../services/UrlDB.js";
import { FileBufferDataDB, FileDataDB } from "../common/Structures.js";
import fileDB from "../services/FileDB.js";
import bufferDB from "../services/BufferDB.js";

const filesRouter = Router()

filesRouter.use(JWT_middlware);


filesRouter.post("/addfile/:urlid",async function(req:Request, res:Response)  {
    try{
        const urlid = req.params.urlid;
        // console.log(`/addfile/${urlid}`);
        const name = req.body.name;
        const size = req.body.size;
        const lastModified = req.body.lastModified;
        
        console.log(`/addfile name(${name}), size:(${size})`);

        
        //todo : bufferID сделать проверку. 
        if(typeof name !== "string" || typeof size !== "number" || 
                typeof lastModified !== "number"){
            res.status(400).json({error:"не коректные данные."});
            return;
        }

        const file :FileDataDB = { name: name, size: size,
            lastModified:lastModified, bufferID: null,
        }

        const createdFile = await fileDB.Add(file);
        if(createdFile && file.id){
            const fileadded  = await urlDB.AddFileToUrl(urlid,file.id);
            // console.log("addfile AddFileToUrl result: ",result);
            if(fileadded){
                res.status(200).json({fileid: file.id});
            }else{
                //удаление file
                const deleted = await fileDB.Remove(file.id);
                if(deleted){ 
                    res.status(400).json({error:"fileadded is false. 34563468708706"});
                }else{
                    throw "deleted is false but должен быть удален. 405682476802470626";
                }
            }
        }else{
            res.status(400).json({error:"createdFile is false. 34800808067854756"});
        }
    }catch(error){
        console.log("addfile error: ",error);
        res.status(500).json({error:"34923046024862946"});
    }    
});




filesRouter.post("/filesinfo",async function(req:Request, res:Response)  {
    try{
        const filesid: string[] = req.body.filesid;
        // console.log(`/filesinfo`,filesid);

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
        console.log(`/fileinfo fileid(${fileid})`);

        const file = await fileDB.Get(fileid);
        if(file){
            res.status(200).json(file);
        }else{
            res.status(300).json({error:"file not found. 3096874238672408962046"});
        }
    }catch(error){
        console.log("fileinfo/:fileid error: ",error);
        res.status(500).json({error:"975795484678467567"});
    }    
});





filesRouter.post("/deletefile",async function(req:Request, res:Response)  {
    try{
        const urlid: string = req.body.urlid;
        const fileid: string = req.body.fileid;
        console.log(`/filesinfo urlid(${urlid}) fileid(${fileid})`);

        const result = await urlDB.DeleteFile(urlid,fileid);
        if(result){
            res.status(200).json();
        }
        else{
            res.status(250).json({error:"563563635765786789"})
        }

    }catch(error){
        console.log("uploadfile error: ",error);
        res.status(500).json({error:"34923046024862946"});
    }    
});












// filesRouter.post("/uploadfile/:urlid",async function(req:Request, res:Response)  {
//     try{
//         const urlid = req.params.urlid;
//         console.log(`/uploadfile/${urlid}`);
//         // console.log('Bufferok body: ', req.body);

//         const buffer = req.rawBody;
//         const file :FileBufferDataDB = {buffer: buffer,nextid:"",size: buffer.length}
//         const resultAdd = await bufferDB.Add(file);
//         console.log("uploadfile resultAdd: ",resultAdd, file);

//         if(resultAdd){
//             res.status(200).send();
//         }else{
//             res.status(400).send();
//         }
//     }catch(error){
//         console.log("uploadfile error: ",error);
//         res.status(500).json({error:"34923046024862946"});
//     }    
// });


// filesRouter.get("/downloadfile/:urlid",async function(req:Request, res:Response)  {
//     try{
//         const urlid = req.params.urlid;
//         console.log(`/downloadfile/${urlid}`);
        
//         const result = await bufferDB.Get(urlid);
//         // console.log("downloadfile result: ",result);
        
//         if(result){
//             const buffer = Buffer.from(result.buffer.buffer);
//             // console.log("downloadfile buffer: ",buffer, buffer.length);
//             res.status(200).send(buffer);
//         }else{
//             res.status(250).send();
//         }
//     }catch(error){
//         console.log("downloadfile error: ",error);
//         res.status(500).json({error:"34923046024862946"});
//     }    
// });






//success

export default filesRouter;











// filesRouter.get('/downloadblob',async function(req:Request, res:Response)  {
//     console.log("/downloadblob");
//     try {
//         // res.status(200).json(fileME);
        
//         const geME : any = await fileDB.findOne({_id: fileID});
//         console.log("GetMe Buffer: ", geME);

//         res.status(200).json({data: geME.bufferok});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error:"file is not exist" });
//     }
// });

// filesRouter.get('/upload_blob/id',async function(req:Request, res:Response)  {
//     console.log("/upload_blob");
//     try {
//         // res.status(200).json(fileME);
        
//         const geME : any = await fileDB.findOne({_id: fileID});
//         console.log("GetMe Buffer: ", geME);

//         res.status(200).json({data: geME.bufferok});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error:"file is not exist" });
//     }
// });


// filesRouter.post("/req_uploadfile/:urlid",function(req:Request, res:Response)  {
//     const urlid = req.params.urlid;
//     console.log("/req_uploadfile/:urlid", urlid);
//     try{

//         res.status(200).json({ status:"uploaded",});
//     }catch(error){

//     }    
// });