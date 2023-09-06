import { Binary, ObjectId, ReturnDocument } from "mongodb";
import db from "./db/db.js";
import { FileDataDB, UrlDataDB } from "../common/Structures.js";

const urlsCollection = await db.collection("urls");

class UrlDB{
    async Get(id:string): Promise<UrlDataDB | undefined>{
        try {
            const url = await urlsCollection.findOne({_id:new ObjectId(id)});
            if(url){
                return {
                    id: url._id.toString(),
                    name: url.name,
                    filesID: url.filesID,
                    JWTID: url.JWTID,
                };
            }else{
                return;
            }
        } catch (error) {
            console.log(`UrlDB GET(id:${id}) error:${error}`)
            return;
        }
    }
    async Add(urldata:UrlDataDB):Promise<boolean>{
        try {
            const {id, ...doc} = urldata;
            const result = await urlsCollection.insertOne(doc);
            // console.log("AddUrl result: ",result);

            if(result.acknowledged){
                urldata.id = result.insertedId.toString();
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            console.log(`UrlDB Add(urldata) error:${error}`);
            return false;
        }
    }
    async Update(urldata:UrlDataDB):Promise<boolean>{
        try {
            if(!urldata.id) throw "urldata have not id (error 5674569309586)";

            const {id,...doc} = urldata;
            const result = await urlsCollection.replaceOne({_id:new ObjectId(urldata.id)}, doc);
            // console.log("Update result: ",result);
            return result.acknowledged;
        } catch (error) {
            console.log("UrlDB Update 5686480: ",error)
            return false;
        }
    }

    async DeleteFile(urlid:string,fileid:string):Promise<boolean>{
        try {
            const result= await urlsCollection.findOne({_id:new ObjectId(urlid)});
            // console.log("DeleteFile result: ",result);
            if(!result) return false;

            const {_id,...doc} = result;
            const urldata = doc as UrlDataDB;
            urldata.filesID = urldata.filesID.filter(f=>{return f !== fileid});

            const result2 = await urlsCollection.replaceOne({_id:new ObjectId(_id.toString())}, urldata);
            
            return result2.acknowledged;
        } catch (error) {
            console.log("FileDB DeleteFile 568565468: ", error)
            return false;
        }
    }

    
    async Delete(urlid:string):Promise<boolean>{
        try {
            const result= await urlsCollection.deleteOne({_id:new ObjectId(urlid)});
            console.log("Delete result: ",result);

            return result.acknowledged;
        } catch (error) {
            console.log("FileDB DeleteFile 568565468: ", error)
            return false;
        }
    }

    async AddFileToUrl(urlid:string,fileid:string):Promise<boolean>{
        try {
            const result= await urlsCollection.findOne({_id:new ObjectId(urlid)});
            // console.log("AddFileToUrl result: ",result);
            if(!result) return false;

            const {_id,...doc} = result;
            const urldata = doc as UrlDataDB;
            urldata.filesID.unshift(fileid);

            const result2 = await urlsCollection.replaceOne({_id:new ObjectId(_id.toString())}, urldata);
            
            return result2.acknowledged;
        } catch (error) {
            console.log("FileDB ChangeBufferID 7686796794: ", error)
            return false;
        }
    }

    async GetIDsByUserJWTID(JWTID:string): Promise<string[] | undefined>{
        try {
            // console.log(`GetIDsByUserJWTID(${JWTID})`)
            const cursor  = urlsCollection.find({ JWTID: { $eq: JWTID } }).limit(100);
            const IDs: string[] = [];
            while(await cursor.hasNext()){
                const doc = await cursor.next();
                if(!doc) continue;
                IDs.push(doc._id.toString());
            }
            return IDs;
        } catch (error) {            
            console.log(`UrlDB GetIDsByUserJWTID(JWTID:${JWTID}) error: ${error}`);
            return;
        }
    }
}
const urlDB =  new UrlDB();
export default urlDB;










// const has = await cursor.hasNext();
// console.log(`has: ${has}`)
// const doc = await cursor.next();
// console.log("While doc: " ,doc);


// // var myDocument = await cursor.hasNext() ? cursor.next() : null;
// // if (myDocument) {
// //     console.log("myDocument: ", myDocument);
// // }

// // console.log("TEST URLS GET ID: ", urls.ma((doc)=>{return; console.log(doc._id);}));













// async Add(urldata:UrlData):Promise<boolean>{
//     try {
//         const nDoc = {...urldata};
//         const result = await urlsCollection.insertOne(nDoc);
//         // console.log("AddUrl result: ",result);
//         if(!result.acknowledged) return false;
//         urldata.id = result.insertedId.toString();
//         return true;
//     } catch (error) {
//         console.log("UrlDB Add 6796798: ",error)
//         return false;
//     }
// }

// async Update(urldata:UrlData):Promise<boolean>{
//     try {
//         if(!urldata.id) throw "urldata have not id (error 5674569309586)";

//         const {id,...doc} = urldata;
//         const result = await urlsCollection.replaceOne({_id:new ObjectId(urldata.id)}, doc);
//         // console.log("Update result: ",result);
//         return result.acknowledged;
//     } catch (error) {
//         console.log("UrlDB Update 5686480: ",error)
//         return false;
//     }
// }







// export async function inserFILE(buf:Buffer){
//     // const inserME :any = {buf: new Uint8Array(buf.buffer), text:"LOLTEXT"};
//     const inserME :any = {buf: buf, text:"LOLTEXT"};
//     const ff2 = await urlsDB.insertOne(inserME);
//     console.log("ff3: ", ff2,inserME);

//     const getMe = await urlsDB.findOne({_id:new ObjectId(inserME._id)});
//     const bbbb :Binary = getMe?.buf;
//     console.log("bbbb: ", bbbb);
//     console.log("getMe: ", getMe);
//     console.log("getMe2: ", bbbb.buffer);
    
// }



// interface URLInfoDB{
//     _id?:ObjectId
//     creater_token: string
//     fileIDs: string[]
// }

// interface FileInfoDB{
//     _id?:ObjectId

//     chankBlobID: string
//     name:string
//     size:number
//     sizeBlub:number
//     lastModified:number
//     type:string
//     webkitRelativePath:string
// }

// const UrlInfos: URLInfoDB[] = [];


// export function GetUrlInfo(_id:string){

// }





// const defInfo:Info_UrlDB = { id:"34425581", files:[...RandINFOS()] }
// const defInfo2:Info_UrlDB = { id:"45767688", files:[...RandINFOS()] }

// const Info_UrlsDB: Info_UrlDB[] = [defInfo,defInfo2];





// export function GetInfo_Url(id:string): Info_UrlDB | undefined{
//     const f = Info_UrlsDB.find(e=>{return id === e.id;})
//     return f;
// }

// export function UrlIsExist(id:string):boolean{
//     let existeIU = false;
//     Info_UrlsDB.forEach(e=>{ if(e.id === id){existeIU = true;} });
//     return existeIU;
// }


// function AddUrl(data:Info_UrlDB){
//     Info_UrlsDB.push(data);
// }


// export function CreateUrl(): Info_UrlDB{
//     const iu : Info_UrlDB = {id: RandomURLID(),files:[]};
//     AddUrl(iu);
//     return iu;
// }



// function RandomURLID(): string {
//     const URL_SIZE: number = 8;

//     let str = "";
//     for(let p = 0;p< URL_SIZE;p++){
//         str += Math.round((Math.random()*9)).toString();
//     }
//     return str;
// }










// function RandINFOS():FileInfo[]{
//     function RamdINFO():FileInfo{
//         return {
//             name:"Rand Name " + Math.random(),
//             id:"00" + Math.random(),
//             lastModified:1234,
//             size:346456,
//             type:"rtrt",
//             webkitRelativePath:""
//         };
//     }
        
//     const list:FileInfo[] = [];
//     for(let p = 0, doo = Math.round(Math.random()*5+5);p <doo ;p++){
//         list.push(RamdINFO());
//     }
//     return list;
// }

























// // const canvasDB = await db.collection("canvas");


// // export type StringID = string;

// // export interface ObjectData{ _id?: ObjectId }
// // export interface ObjectData{ _id?: ObjectId }



// // export interface UrlinfoDB extends ObjectData{
    
// // }

// // export interface Urlinfo{
    
// // }


// // export interface UserData extends ObjectData  {
// //     // sid:SessionID
// //     name: string
// //     email:string
// //     canvases: StringID[]
// // }

// // export interface CanvasData extends ObjectData {
// //     name: string
// //     colomns: StringID[]
// // }




// // export async function GetCanvas(id:string) : Promise<CanvasData>
// // {
// //     const canvas = await canvasDB.findOne({_id:new ObjectId(id)});
// //     // console.log(canvas);
// //     return canvas as CanvasData; 
// // }

// // export async function GetNames():Promise<CanvasData[]>
// // {
// //     const canvas = await canvasDB.find({});
// //     let listCanvas:CanvasData[] = [];
// //     await canvas.forEach(d => {
// //         listCanvas.push({_id:d._id,name:d.name,colomns:d.colomns? d.colomns:[]});
// //     });
// //     return listCanvas; 
// // }

// // export async function CreateCanvas(canv:CanvasData):Promise<CanvasData>
// // {
// //     const canvas = await canvasDB.insertOne(canv);
// //     console.log("Created: ", canv);
// //     console.log(canvas);
// //     return canv; 
// // }

// // // console.log("Count: ",await canvasDB.estimatedDocumentCount())

