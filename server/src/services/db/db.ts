import { MongoClient } from "mongodb";


const connectionString = "mongodb+srv://zombiehelka:jDzY1p5iU4KJT1WZ@cluster0.plhi6ct.mongodb.net/?retryWrites=true&w=majority";

const NameDataBase = "File_Sharing_Service";//file_sharing_service
const client = new MongoClient(connectionString);


let conn = await client.connect();
let db = conn.db(NameDataBase);

export default db;












// interface FileDB{
//     _id:string
// }

// export interface FileInfo{
//     id:string

//     name:string
//     size:number
//     sizeBlub:number
//     lastModified:number
//     type:string
//     webkitRelativePath:string
// }






// const ob1 :any = { kek:"kekes", beb:undefined};
// const ff2 = await urlsDB.insertOne(ob1);
// console.log("ff2: ", ff2,ob1);
// const ff3  = await urlsDB.findOne({_id: new ObjectId( ob1._id?.toString()) });
// console.log("ff3: ", ff3,ob1);
// console.log("Und | null" , ff3?.beb === null, ff3?.beb === "undefined")
