import axios from "axios";
import { GetBackendURL } from "../../../common/Backend";
import { FileDataDB, UrlDataDB } from "../../../common/Structures";
import { DownloadData } from "./DownloadStore";
import api from "../../../api/api";


export function GetUrlInfoPromise(urlid:string):Promise<UrlDataDB | undefined>{
    return new Promise(async(res,rej)=>{
        try {
            // console.log("GetInfo");
            const result = await axios.get(GetBackendURL(`/info_url/${urlid}`),{
                withCredentials:true,
            });
            // console.log("GetInfo result",result);
            if(result.status === 200){
                const urldata = result.data;
                res(urldata);
            }
            else{
                res(undefined);
            }
        } catch (error) {
            res(undefined);
        }
    });
}

export function GetFileDatasPromise(filesid:string[]):Promise<FileDataDB[] | undefined>{
    return new Promise(async(res,rej)=>{
        try {
            // console.log("GetFileDatasPromise");
            const result = await axios.post(GetBackendURL(`/filesinfo`),{filesid},{
                withCredentials:true,
            });
            // console.log("GetFileDatasPromise result",result);
            if(result.status === 200){
                const urldata = result.data.files;
                res(urldata);
            }
            else{
                res(undefined);
            }
        } catch (error) {
            console.log("GetFileDatasPromise error:", error);
            res(undefined);
        }
    });
}


//todo доделать
export function DeleteFilePromise(urlid:string, fileid:string):Promise<boolean>{
    return new Promise(async(res,rej)=>{
        console.log("DeleteFilePromise");
        const result = await axios.post(GetBackendURL(`/deletefile`),{
            urlid: urlid,
            fileid: fileid,
        },{
            withCredentials:true,
        });
        console.log("DeleteFilePromise result",result);


        if(result.status === 200){
            res(true);
        }
        else{
            res(false);
        }
    });
}


export async function DownloadFile(file:DownloadData):Promise<Buffer> {
    return new Promise(async(resolve,reject)=>{
        try {
            const res = await api.get(GetBackendURL(`/downloadfile/${file.fileData.bufferID}`),{
                responseType: 'arraybuffer',
                onDownloadProgress(progressEvent) {
                    file.downloadLoaded = progressEvent.loaded;
                    file.downloadSize = progressEvent.total || 0;
                    file.downloadProc = progressEvent.progress || 0;
                    // console.log("onDownloadProgress: ",progressEvent);
                }
            });
            if(res.status === 200){
                resolve(res.data as Buffer);
            }else{                
                reject();
            }
        } catch (error) {
            console.log("DownloadFile error 456893-5394954-35: ",error);
            reject("759595967954684468");
        }
    });
}