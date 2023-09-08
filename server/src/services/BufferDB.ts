import {  Document, ObjectId, WithId } from "mongodb";
import { FileBufferDataDB } from "../common/Structures";
import db from "./db/db.js";

const buffersCollection = await db.collection("buffers");

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
            console.log("BufferDB Get error: ", error);
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
            console.log("BufferDB Add error: ", error);
            return false;
        }
    }

    async Delete(bufferID:string):Promise<boolean>{
        try {
            let result:WithId<Document> | null;
            let nextID:string | null = bufferID;
            do {
                result = await buffersCollection.findOne({_id:new ObjectId(nextID)});
                if(result){
                    const nid:string | null = (result as unknown as FileBufferDataDB).nextid;
                    
                    const deleted = (await buffersCollection.deleteOne({_id:new ObjectId(nextID)})).acknowledged;
                    // console.log(`Delete nextID: ${nextID}`);
                    if(!deleted)throw `Delete(bufferID:${bufferDB},nextID:${nextID}) nextID не удалился. 34=-680924-6926`
                    nextID = nid;
                }else{
                    nextID = null;
                }
            } while (nextID);
            return true;
        } catch (error) {
            console.log("BufferDB Delete error: ", error);
            return false;
        }
    }

}
const bufferDB = new BufferDB(); 
export default bufferDB;