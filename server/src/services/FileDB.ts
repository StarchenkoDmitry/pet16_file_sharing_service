import { Binary, ObjectId, ReturnDocument } from "mongodb";
import { FileBufferDataDB, FileDataDB } from "../common/Structures";
import db from "./db/db.js";
import bufferDB from "./BufferDB.js";


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

    async Remove(fileid:string):Promise<boolean>{
        try {
            const result = await filesCollection.findOne({_id:new ObjectId(fileid)});
            if(!result) return false;

            const bufID = (result as unknown as FileDataDB).bufferID;
            if(bufID){
                const deletedBuffers = await bufferDB.Delete(bufID);
                if(!deletedBuffers)
                    console.log(`FileDB Remove(fileid:${fileid}) error: bufferDB.Delete(${bufID}) deletedBuffers is false`);
            }else{
                console.log(`FileDB Remove(fileid:${fileid}) error: bufID is null`);
            }

            const result2 = await filesCollection.deleteOne({_id:new ObjectId(fileid)});
            return result2.acknowledged;
        } catch (error) {
            console.log("FileDB Remove error: ", error)
            return false;
        }
    }
    
    async Add(file:FileDataDB):Promise<boolean>{
        try {
            const {id: fileid , ...filedata} = file;
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
            if(result) {
                const {_id,...doc} = result;
                const nDoc = doc as FileDataDB;
                nDoc.bufferID = bufferid;
                const result2 = await filesCollection.replaceOne({_id:new ObjectId(_id.toString())}, nDoc);
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