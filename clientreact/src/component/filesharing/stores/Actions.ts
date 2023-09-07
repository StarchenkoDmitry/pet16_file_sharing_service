import axios from "axios";
import { GetBackendURL } from "../../../common/Backend";
import { FileDataDB, UrlDataDB } from "../../../common/Structures";
import { DownloadData } from "./DownloadStore";
import api from "../../../api/api";
import { URL_GET_FILEDATADB } from "../../../common/Constanter";


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


export function DownloadFile(file:DownloadData):Promise<Buffer> {
    return new Promise<Buffer>(async(resolve,reject)=>{
        try {
            const res = await api.get(GetBackendURL(`/downloadfile/${file.fileData.bufferID}`),{
                responseType: 'arraybuffer',
                signal: file.signalAbort?.signal,
                onDownloadProgress(progressEvent) {
                    file.downloadLoaded = progressEvent.loaded;
                    file.downloadSize = progressEvent.total || 0;
                    file.downloadProc = progressEvent.progress || 0;
                    // console.log("onDownloadProgress: ",progressEvent);
                },
            });
            if(res.status === 200){
                resolve(res.data as Buffer);
            }else{
                reject();
            }
        } catch (error:any) {
            //name "CanceledError"
            //code "ERR_CANCELED"
            //message "canceled"
            console.log("DownloadFile error 456893-5394954-35: ",error);
            if(typeof error === "object"){
                if(error.code === "ERR_CANCELED"){
                    reject("canceled");
                }
                else{
                    reject();
                }
            }
            else{
                reject();
            }
        }
    });
}



export async function GetFileDataDB(fileid:string):Promise<FileDataDB>{
    return new Promise( async (res,rej)=>{
        try {
            const result = await api.get(`${URL_GET_FILEDATADB}${fileid}`);
            // console.log("GetFileDataDB result: ",result);
            result.status === 200? res(result.data) : rej();
        } catch (error) {
            console.log("GetFileDataDB -98462-486-2865-4 error: ",error);
            rej();
        }
    });
}