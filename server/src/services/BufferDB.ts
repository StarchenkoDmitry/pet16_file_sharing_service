import { Binary, ObjectId } from "mongodb";
import { FileBufferDataDB } from "../common/Structures";
import db from "./db/db.js";

const buffersCollection = await db.collection("buffers");

// console.log("buffersCollection",await buffersCollection.));
// Object.bsonsize(buffersCollection.findOne({type:"auto"}))
// Object.bsonsize(obj);

class BufferDB{
    async Get(id:string):Promise<FileBufferDataDB | undefined>{
        try {
            const doc = await buffersCollection.findOne({_id:new ObjectId(id)});
            if(!doc){ return; } 
            else { 
                return {
                    id: doc._id.toString(),
                    buffer: doc.buffer,
                    size: doc.size,
                    nextid: doc.nextid,
                }
            };
        } catch (error) {
            return;
        }
    }
    
    async Add(buffer:FileBufferDataDB):Promise<boolean>{
        try {
            const {id , ...filedata} = buffer;
            const result = await buffersCollection.insertOne(filedata);
            if(result.acknowledged){
                buffer.id = result.insertedId.toString();
            }
            return result.acknowledged;
        } catch (error) {
            console.log("FileDB Add 7568476: ", error)
            return false;
        }
    }

    async Delete(bufferID:string){
        throw "my error: 3-40476240762048678";
    }

}
const bufferDB = new BufferDB(); 
export default bufferDB;







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




