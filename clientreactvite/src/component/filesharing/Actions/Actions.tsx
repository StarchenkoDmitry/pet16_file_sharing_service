import axios, { AxiosProgressEvent } from "axios";
import { FileOnUpload } from "./Structures";
import { RandomName, fileBlobToArrayBuffer_Promise } from "../utils/Utils";
import { GetBackendURL } from "../../../common/Backend";
import { FileDataDB, UrlDataDB } from "../../../common/Structures";

import {Buffer} from 'buffer';
import { CreateUrlResult } from "../modal/CreateUrlForm";

import Cookies from  "js-cookie"

// export async function GetInfoUrl(){

// }

// export async function UploadFile(urlid:string,file:FileOnUpload):Promise<boolean> {
//     try {
//         const arrayBuffer = await fileBlobToArrayBuffer_Promise(file.file);
//         const buffer = Buffer.from(arrayBuffer);
//         console.log("UploadFile Buffer: ",buffer);
        
//         const res = await axios.post(GetBackendURL(`/uploadfile/${urlid}`), buffer,{
//             withCredentials:true,
//             onUploadProgress:(event:AxiosProgressEvent)=>{
//                 const ld = event.loaded;
//                 const to = event.total ?? 0;
//                 console.log("Leng:" ,ld, to);
//                 file.loaded = ld;
//                 // file.size = ld;
//                 if(to > 0){
//                     const proc = Math.round(ld / to * 100);
//                     file.procentUploaded = proc;

//                     if(file.onUpdateProcent) file.onUpdateProcent(proc);
//                 }
//             }
//         });
//         console.log("UploadFile result data: ", res.data);

//         return res.status === 200;
//     }catch(error) {
//         console.log("UploadFile error: ",error);
//         return false;
//     }
// }

export async function AddFileOnServer(urlid:string,file:FileOnUpload):Promise<string | undefined>{
    try {
        const res = await axios.post(GetBackendURL(`/addfile/${urlid}`), {
            name:file.file.name,
            size:file.file.size,
            lastModified:file.file.lastModified,
        },{ withCredentials:true });
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
        const newFileID = await AddFileOnServer(urlid,file);
        if(!newFileID){
            return false;
        }

        const arrayBuffer = await fileBlobToArrayBuffer_Promise(file.file);
        // console.log("UploadFile arrayBuffer: ",arrayBuffer);
        const buffer = Buffer.from(arrayBuffer);
        console.log("UploadFile Buffer: ",buffer);
        
        const res = await axios.post(GetBackendURL(`/uploadfile/${newFileID}`), buffer,{
            withCredentials:true,
            onUploadProgress:(event:AxiosProgressEvent)=>{
                const ld = event.loaded;
                const to = event.total ?? 0;
                console.log("Leng:" ,ld, to);
                file.loaded = ld;
                // file.size = ld;
                if(to > 0){
                    const proc = Math.round(ld / to * 100);
                    file.procentUploaded = proc;

                    if(file.onUpdateProcent) file.onUpdateProcent(proc,ld,to);
                }
            }
        });
        console.log("UploadFile result data: ", res.data);

        return res.status === 200;
    }catch(error) {
        console.log("UploadFile error: ",error);
        return false;
    }
}



// export async function DownloadFile(urlid:string){
//     try {
//         const res = await axios.get(GetBackendURL(`/downloadfile/${urlid}`),{
//             withCredentials:true,
//             responseType: 'arraybuffer'
//         });
//         const buffer = res.data as ArrayBuffer;
//         console.log("DownloadFile buffer: ",buffer);
//         await SaveFile(buffer,"rand.png");


//     } catch (error) {        
//         console.log("DownloadFile error: ",error);
//     }
// }

export async function SaveFile(buffer : ArrayBuffer,nameFile: string):Promise<boolean>{
    try {
        const blob = new Blob([buffer]);

        const a = document.createElement("a");
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = nameFile;
        a.click();

        if(typeof window !== "undefined"){
            window.URL.revokeObjectURL(url);
        }
        return true;
    } catch (error) {
        console.log("SaveFile error: ",error);
        return false;
    }
}

export function downloadFileFromBlob(tBlob:Blob,nameFile:string){

    const a = document.createElement("a");
    let url = window.URL.createObjectURL(tBlob);
    // console.log("url: " + url);
              
    a.href = url;
    a.download = nameFile;
    a.click();
  
    // if (isBlob) {
    //   window.URL.revokeObjectURL(url);
    // }
}




// if(typeof window !== "undefined"){ 
//     AddFileToUrl();
// }
export async function AddFileToUrl(){
    const urlid  = "64dec52e23d64bf33f6c5542";
    const file: FileDataDB = {name:"dfgsdg",size:346346,lastModified:646,bufferID:null}

    const res = await axios.post(GetBackendURL(`/addfile/${urlid}`),file,{
        withCredentials:true,
    });

    console.log("res: ",res.status,res.data);
}




export async function CreateUrl():Promise<CreateUrlResult> {
    // name:string = RandomName()
    try {
        const res = await axios.post(GetBackendURL("/create_url"),{name:RandomName()},{withCredentials:true});
        console.log("CreateUrl result: ",res.data);
        if(res.status === 200){
            return {created: true,urlid: res.data.urlid}
        }
        else{
            return {created: false,urlid:""};
        }
    } catch (error) {
        console.log("CreateUrl error: ", error);
        return {created:false,urlid:""};
    }
}

export async function CreateUrlWithName(name:string):Promise<CreateUrlResult> {
    try {
        const res = await axios.post(GetBackendURL("/create_url"),{name:name},{withCredentials:true});
        console.log("CreateUrlWithName result: ",res.data);
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
        const res = await axios.post(GetBackendURL("/delete_url"),{id},{withCredentials:true});
        // console.log("DeleteUrlByID result: ",res.data);
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
            const result = await axios.get(GetBackendURL("/myurls"), {withCredentials:true});
            // console.log("GetMyUrls result: ",result.data);
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
            const result = await axios.get(GetBackendURL("/myurlsinfo"), {
                withCredentials:true},);
            console.log("GetMyUrls result: ",result,Cookies.get("DIMKA"));
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