import { Binary, ObjectId, ReturnDocument } from "mongodb";
import { FileBufferDataDB, FileDataDB } from "../common/Structures";
import db from "./db/db.js";


const filesCollection = await db.collection("files");

class FileDB{
    async Get(id:string):Promise<FileDataDB | undefined>{
        try {
            const doc = await filesCollection.findOne({_id:new ObjectId(id)});
            if(!doc){ return; } 
            else { 
                return {
                    id: doc._id.toString(),
                    name: doc.name,
                    size: doc.size,
                    lastModified: doc.lastModified,
                    bufferID: doc.bufferID,
                }
            };
        } catch (error) {
            return;
        }
    }

    async Remove(id:string):Promise<boolean>{
        try {
            const result = await filesCollection.deleteOne({_id:new ObjectId(id)});
            return result.acknowledged;
        } catch (error) {
            console.log("FileDB Remove 56756858548: ", error)
            return false;
        }
    }
    
    async Add(file:FileDataDB):Promise<boolean>{
        try {
            const {id , ...filedata} = file;
            const result = await filesCollection.insertOne(filedata);
            if(result.acknowledged){
                file.id = result.insertedId.toString();
            }
            return result.acknowledged;
        } catch (error) {
            console.log("FileDB Add 7568476: ", error)
            return false;
        }
    }
    
    async ChangeBufferID(fileID:string,bufferid:string):Promise<boolean>{
        try {
            const result = await filesCollection.findOne({_id:new ObjectId(fileID)});
            // console.log("ChangeBufferID result: ",result);
            if(result) {
                const {_id,...doc} = result;
                const nDoc = doc as FileDataDB;
                nDoc.bufferID = bufferid;
                const result2 = await filesCollection.replaceOne({_id:new ObjectId(_id.toString())}, nDoc);
                // console.log("ChangeBufferID result2: ",result2);
                return result2.acknowledged;
            }else{
                return false;
            }
        } catch (error) {
            console.log("FileDB ChangeBufferID 7686796794: ", error)
            return false;
        }
    }
}
const fileDB = new FileDB(); 
export default fileDB;







// function ValidyFileData(f:FileData):boolean{
//     return (f.id !== null && Number.isInteger(f.size))
// }
//Binary







// const canvasDB = await db.collection("canvas");


// export async function GetCanvas(id:string) : Promise<CanvasData>
// {
//     const canvas = await canvasDB.findOne({_id:new ObjectId(id)});
//     // console.log(canvas);
//     return canvas as CanvasData;
// }

// export async function GetNames():Promise<CanvasData[]>
// {
//     const canvas = await canvasDB.find({});
//     let listCanvas:CanvasData[] = [];
//     await canvas.forEach(d => {
//         listCanvas.push({_id:d._id,name:d.name,colomns:d.colomns? d.colomns:[]});
//     });
//     return listCanvas; 
// }

// export async function CreateCanvas(canv:CanvasData):Promise<CanvasData>
// {
//     const canvas = await canvasDB.insertOne(canv);
//     console.log("Created: ", canv);
//     console.log(canvas);
//     return canv; 
// }





// // console.log("Count: ",await canvasDB.estimatedDocumentCount())




