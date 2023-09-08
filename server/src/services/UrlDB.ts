import { Binary, ObjectId, ReturnDocument } from "mongodb";
import db from "./db/db.js";
import { FileDataDB, UrlDataDB } from "../common/Structures.js";
import fileDB from "./FileDB.js";

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

    //TODO: доработать result2 и всё остальное.
    async DeleteFile(urlid:string,fileid:string):Promise<boolean>{
        try {
            const result= await urlsCollection.findOne({_id:new ObjectId(urlid)});
            if(!result) return false;

            const {_id,...doc} = result;            
            const urldata = doc as UrlDataDB;

            urldata.filesID = urldata.filesID.filter(f=>{return f !== fileid});
            const result2 = await urlsCollection.replaceOne({_id:new ObjectId(_id.toString())}, urldata);
            
            const deletedFiel = await fileDB.Remove(fileid);
            if(!deletedFiel){
                console.log(`FileDB DeleteFile(urlid:${urlid},fileid:${fileid}) deletedFiel is false error:`);
            }

            return result2.acknowledged;
        } catch (error) {
            console.log("FileDB DeleteFile 568565468: ", error)
            return false;
        }
    }

    private async WhileDeleteFiles(filesID:string[]) {
        filesID.forEach(async f=>{
            console.log(`Start delete fileid: ${f}`);
            const deleted =  await fileDB.Remove(f);
            console.log(`End   delete fileid: ${f} deleted:${deleted}`);
        });
    }
    
    async Delete(urlid:string):Promise<boolean>{
        try {
            const rawDoc = await urlsCollection.findOne({_id:new ObjectId(urlid)});
            if(!rawDoc){
                console.log(`FileDB Delete(urlid:${urlid}) rawDoc is null`)
                return false;
            }
            else{
                const {_id,...doc} = rawDoc;
                const urlData = doc as UrlDataDB;
                this.WhileDeleteFiles(urlData.filesID);

                const result= await urlsCollection.deleteOne({_id:new ObjectId(urlid)});
                return result.acknowledged;
            }
        } catch (error) {
            console.log("FileDB DeleteFile 568565468: ", error)
            return false;
        }
    }

    async AddFile(urlid:string,fileid:string):Promise<boolean>{
        try {
            const result= await urlsCollection.findOne({_id:new ObjectId(urlid)});
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