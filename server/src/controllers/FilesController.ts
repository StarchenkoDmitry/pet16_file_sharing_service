import { FileBufferDataDB } from "../common/Structures";


class filesController{
    async Add(urlid:string,file:Buffer):Promise<boolean>{
        
        
        return false;
    }
}

const FilesController = new filesController();
export default FilesController;


// async Add222(file:FileBufferDataDB):Promise<boolean>{
//     try {
//         const {id , ...filedata} = file;
//         const result = await filesDB.insertOne(filedata);
//         return result.acknowledged;
//     } catch (error) {
//         console.log("FileDB Add 7568476: ", error)
//         return false;
//     }
// }


// async function inserFILE(buf:Buffer){
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

