import { Request, Response, Router } from "express";
import { JWT_middlware } from "./Middlware/JWT.js";
import { FileBufferDataDB } from "../common/Structures.js";
import bufferDB from "../services/BufferDB.js";
import fileDB from "../services/FileDB.js";
import { MAX_FILE_SIZE, MIB, SIZE_BUFFERCHANK } from "../common/Constanter.js";

const buffersRouter = Router()
buffersRouter.use(JWT_middlware);

buffersRouter.post("/uploadfile/:fileid",async function(req:Request, res:Response)  {
    try{
        const fileid = req.params.fileid;
        // console.log(`/uploadfile/${fileid}`);
        if(typeof fileid !== "string"){
            res.status(350).json({error:"fileid is not string"});
            return;
        }

        const buffer = req.rawBody;
        if(!Buffer.isBuffer(buffer)){
            res.status(350).json({error:"buffer is not Buffer"});
            return;
        }

        if(buffer.byteLength >= MAX_FILE_SIZE){
            res.status(300).json({error:"buffer length bigger then MAX_FILE_SIZE"});
            return;
        }
        
        const slisiks  :Buffer[] = [];
        for(let p =0, end =buffer.byteLength; p< end;p+=SIZE_BUFFERCHANK){
            if(end - p< SIZE_BUFFERCHANK){
                slisiks.push(buffer.subarray(p,end));
            }
            else{
                slisiks.push(buffer.subarray(p,p+ SIZE_BUFFERCHANK));
            }
        }
        
        slisiks.reverse();
        const bufferDataList:FileBufferDataDB[] = [];

        for(let p=0;p< slisiks.length;p++){
            if(p === 0){
                const bufferData :FileBufferDataDB = {
                    buffer: slisiks[p],
                    nextid: null,
                    size: slisiks[p].byteLength
                }
                bufferDataList.push(bufferData);
            }else{
                const nextID = bufferDataList[p-1].id;
                if(!nextID){ throw "Error nextID is null. 3467240867204876082476824"; }

                const bufferData :FileBufferDataDB = {
                    buffer: slisiks[p],
                    nextid: nextID,
                    size: slisiks[p].byteLength
                }
                bufferDataList.push(bufferData);
            }
            const bufferCreated = await bufferDB.Add(bufferDataList[bufferDataList.length-1]);
            if(!bufferCreated) throw "Error bufferCreated is false. 230572305872307203649"
        }

        // const firstBufferDat2 = bufferDataList[bufferDataList.length-1];
        const firstBufferData = bufferDataList.at(-1);
        if(!firstBufferData) throw "error: firstBufferData is undefined. 34790967348086";
        
        const changerd = await fileDB.ChangeBufferID(fileid,firstBufferData.id as string);
        // console.log("fileDB.ChangeBufferID result: ",changerd);

        if(changerd){
            res.status(200).json({bufferid:firstBufferData.id as string});
        }else{
            res.status(300).json({error:"1962408956277804860"});
        }


    }catch(error){
        console.log("uploadfile error: ",error);
        res.status(500).json({error:"34923046024862946"});
    }    
});

buffersRouter.get("/downloadfile/:bufferid",async function(req:Request, res:Response)  {
    try{
        const bufferid = req.params.bufferid;
        // console.log(`/downloadfile/${bufferid}`);

        if(typeof bufferid !== "string"){
            res.status(350).json({error:"bufferid is not string"});
            return;
        }

        const bufferDataList :FileBufferDataDB[] = [];   

        let nextID = bufferid;
        let stop = false;
        while(!stop){
            const result = await bufferDB.Get(nextID);        
            if(!result) { throw `error buffer with id(${nextID}) is not exist. 384760348670834760`}
            else{    
                // console.log("bufferDataList result nextid: ",result.nextid);
                bufferDataList.push(result);
                if(result.nextid){
                    nextID = result.nextid;
                }else{
                    stop = true;
                }
            }
        }
        
        let init: Buffer =Buffer.from([]);
        const sborka = bufferDataList.reduce((c,p)=>{
            return Buffer.from([...c,...Buffer.from(p.buffer.buffer)]);
        },init);
       
        res.status(200).send(sborka);
    }catch(error){
        console.log("/downloadfile/:bufferid error: ",error);
        res.status(500).json({error:"error"});
    }    
});


//success
export default buffersRouter;











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





//Эта штука работает я проверил
// const sborka = slisiks .reduce((c,p)=>{return Buffer.from([...c,...p])});
// console.log("sborka: ", sborka);



            // console.log(`S: p(${p}) end(${end}) if(${end - p< SIZE_BUFFERCHANK})`)



    //  1  2    3
    //3-2 = 1
    //  1  2    3  4
    //4- 2 = 2
    //  1  2    3  4    5 
    //  0  1    2  3    4
    //Эта штука работает я проверил
    // const slisiks  :Buffer[]= [];
    // for(let p =0, end =buffer.byteLength; p< end;p+=SIZE_BUFFERCHANK){
    //     console.log(`S: p(${p}) end(${end}) if(${end - p< SIZE_BUFFERCHANK})`)
    //     if(end - p< SIZE_BUFFERCHANK){
    //         slisiks.push(buffer.subarray(p,end));
    //     }
    //     else{
    //         slisiks.push(buffer.subarray(p,p+ SIZE_BUFFERCHANK));
    //     }
    // }







// const slisek :Buffer[]= [];
// for(let p =0, end =buffer.byteLength; p< end;p+=SIZE_BUFFERCHANK){
//     if(end - p< SIZE_BUFFERCHANK){
//         const b = buffer.subarray(p,end);
//         slisek.push(b);
//     }
//     else{
//         const b = buffer.subarray(p,p+ SIZE_BUFFERCHANK);
//         slisek.push(b);
//     }
// }
// console.log("BUFFER: ", buffer);
// console.log("SLISEK: ", slisek);

// const sborka = slisek.reduce((c,p)=>{return Buffer.from([...c,...p])});
// console.log("sborka: ", sborka);








// buffersRouter.post("/uploadfile/:fileid",async function(req:Request, res:Response)  {
//     try{
//         const fileid = req.params.fileid;
//         console.log(`/uploadfile/${fileid}`);

//         const buffer = req.rawBody;
//         if(buffer.byteLength >= MAX_FILE_SIZE){
//             res.status(300).json({error:"buffer length bigger then MAX_FILE_SIZE"});
//             return;
//         }
        
//         const bufferData :FileBufferDataDB = {
//             buffer: buffer,
//             nextid:"",
//             size: buffer.length
//         }

//         const bufferCreated = await bufferDB.Add(bufferData);
//         console.log("bufferDB.Add result: ",bufferCreated);
        
//         if(bufferCreated && bufferData.id){
//             const changerd = await fileDB.ChangeBufferID(fileid,bufferData.id);
//             // console.log("fileDB.ChangeBufferID result: ",changerd);
//             if(changerd){
//                 res.status(200).json({bufferid:bufferData.id});
//             }else{
//                 res.status(300).json({error:"1962408956277804860"});
//             }
//         }else{
//             res.status(300).json({error:"890967867686743453"});
//         }
//     }catch(error){
//         console.log("uploadfile error: ",error);
//         res.status(500).json({error:"34923046024862946"});
//     }    
// });





// buffersRouter.get("/downloadfile/:bufferid",async function(req:Request, res:Response)  {
//     try{
//         const bufferid = req.params.bufferid;
//         console.log(`/downloadfile/${bufferid}`);
        
//         const result = await bufferDB.Get(bufferid);
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
