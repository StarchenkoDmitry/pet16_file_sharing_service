import { AxiosProgressEvent } from "axios";
import { FileOnUpload } from "./Structures";
import { RandomName, ConvertFileBlobToArrayBuffer } from "../utils/Utils";
import { GetBackendURL } from "../../../common/Backend";
import { UrlDataDB } from "../../../common/Structures";

import {Buffer} from 'buffer';
import { CreateUrlResult } from "../modal/CreateUrlForm";

import api from "../../../api/api";


export async function CreateFile(urlid:string,file:FileOnUpload):Promise<string | undefined>{
    try {
        const res = await api.post(GetBackendURL(`/addfile/${urlid}`), {
            name:file.file.name,
            size:file.file.size,
            lastModified:file.file.lastModified,
        });
        if(res.status === 200){
            const newFileID = res.data.fileid;
            return newFileID;
        }else{
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
}

export async function UploadFile(urlid:string,file:FileOnUpload):Promise<boolean> {
    try {
        const newFileID = await CreateFile(urlid,file);
        if(!newFileID){
            return false;
        }

        file.fileID = newFileID;

        const arrayBuffer = await ConvertFileBlobToArrayBuffer(file.file);
        const buffer = Buffer.from(arrayBuffer);
        
        const res = await api.post(GetBackendURL(`/uploadfile/${newFileID}`), buffer,{
            onUploadProgress:(progressEvent:AxiosProgressEvent)=>{
                file.uploadLoaded = progressEvent.loaded;
                file.uploadSize = progressEvent.total || 0;
                file.uploadProc = progressEvent.progress || 0;
                if(file.onUpdateProcent)
                    file.onUpdateProcent(file.uploadProc,file.uploadLoaded,file.uploadSize);
                // console.log("onUploadProgress: ",progressEvent);
            }
        });
        if(res.status === 200){
            file.bufferID = res.data.bufferid;
        }
        return res.status === 200;
    }catch(error) {
        console.log("UploadFile error: ",error);
        return false;
    }
}

export async function SaveFile(buffer : ArrayBuffer,nameFile: string):Promise<boolean>{
    try {
        const blob = new Blob([buffer]);

        const a = document.createElement("a");
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = nameFile;
        a.click();
        // if(typeof window !== "undefined"){
        //     window.URL.revokeObjectURL(url);
        // }
        return true;
    } catch (error) {
        console.log("SaveFile error: ",error);
        return false;
    }
}

export async function CreateUrl():Promise<CreateUrlResult> {
    return await CreateUrlWithName(RandomName());
}

export async function CreateUrlWithName(name:string):Promise<CreateUrlResult> {
    try {
        const res = await api.post(GetBackendURL("/create_url"),{name:name});
        if(res.status === 200){
            return {created: true,urlid: res.data.urlid}
        }
        else{
            return {created: false,urlid:""};
        }
    } catch (error) {
        console.log("CreateUrlWithName error: ", error);
        return {created:false,urlid:""};
    }
}

export async function DeleteUrlByID(id:string):Promise<Boolean> {
    try {
        const res = await api.post(GetBackendURL("/delete_url"),{id});
        if(res.status === 200){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.log("DeleteUrlByID error: ", error);
        return false;
    }
}

export async function GetMyUrls():Promise<string[]> {
    return new Promise(async(res,rej)=>{
        try {
            const result = await api.get(GetBackendURL("/myurls"));
            if(result.status === 200){
                res(result.data.urls);
            }
            else{
                rej();
                return false;
            }
        } catch (error) {
            console.log("GetMyUrls error: ", error);
            rej();
        }
    });
}

export async function GetMyUrlsInfo():Promise<UrlDataDB[]> {
    return new Promise(async(res,rej)=>{
        try {
            const result = await api.get(GetBackendURL("/myurlsinfo"));
            if(result.status === 200){
                res(result.data.urlsinfo);
            }
            else{
                rej();
                return false;
            }
        } catch (error) {
            console.log("GetMyUrls error: ", error);
            rej();
        }
    });
}