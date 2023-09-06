import { UrlDataDB } from "../common/Structures.js";
import urlDB from "../services/UrlDB.js";

export const MAX_COUNT_FILES = 1000;


// interface UrlInfo{
//     id:string;
//     fileIDs: string[];
// }


// const urls : UrlDataDB[] = [];



class UrlController{
    // async Get(id:string): Promise<UrlDataDB | undefined>{
    //     try {
    //         const url = urls.find(u=>{return u.id === id})
    //         if(url) return url;

    //         const urlFromDB = await urlDB.Get(id);
    //         if(urlFromDB){ urls.push(urlFromDB); }
    //         return urlFromDB;
    //     } catch (error) {
    //         console.log(`UrlController Get(id:${id}) error: ${error}`);
    //         return;
    //     }
    // }
    
    // async Add(){

    // }

    async GetIDsByUserJWTID(JWTID:string): Promise<string[] | undefined>{
        try {
            const IDs = await urlDB.GetIDsByUserJWTID(JWTID);
            // console.log("IDs: ",IDs);
            return IDs;
        } catch (error) {
            console.log(`UrlController GetIDsByUserJWTID(JWTID:${JWTID}) error: ${error}`);
        }
        return;
    }
}
const urlController = new UrlController();
export default urlController;
