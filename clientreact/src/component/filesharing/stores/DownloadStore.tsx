import { makeAutoObservable } from "mobx";
import { GetBackendURL } from "../../../common/Backend";
import axios from "axios";
import { SaveFile } from "../Actions/Actions";
import { FileDataDB } from "../../../common/Structures";
import api from "../../../api/api";
import { DownloadFile, GetFileDataDB } from "./Actions";



export enum DownloadStatus{
    download,
    downloading,
    downloaded,
    download_error
}
export type EventOnDownloadProgress = (downloadProc:number,downloadLoaded:number,downloadSize:number)=>void;

export interface DownloadData{
    fileid:string;

    fileData: FileDataDB;

    status:DownloadStatus;

    downloadLoaded:number;
    downloadSize:number
    downloadProc:number;

    timeEnd: number;

    onDownloadProgress?:EventOnDownloadProgress;
}

const TimeClinning = 100;
const DeleteEnd = 2000;

class DownloadStore{
    private countDownload = 0;
    private countDownloading = 0;
    private countDownloaded = 0;
    private countDownloadError = 0;
    
    files:DownloadData[] = [];    

    filesID:string[] = [];

    constructor(){
        makeAutoObservable(this);
        this.Init();
        // console.log("constructor files: ",this.files);
    }

    private async Init(){
        // console.log("Init files: ",this.files);
        this._promis_clinning = setInterval(this.Clinning.bind(this),
        TimeClinning);
    }

    dispose(){
        clearInterval(this._promis_clinning);
    }    

    getCountDownload():number{ return this.countDownload; }
    getCountDownloading():number{ return this.countDownloading; }
    getCountDownloaded():number{ return this.countDownloaded; }
    getCountDownloadError ():number{ return this.countDownloadError; }
    getCountFiles ():number{ return this.files.length; }

    getCountDownloadAndDownloading():number{
        return this.countDownload + this.countDownloading;
    }

    //TODO: не уверен рабочий ли код
    changePorydocFiles(){
        if(this.files.length < 2)return;
        const file = this.files.slice(0,1);
        const files = this.files.slice(1,this.files.length);
        this.files = [...files,...file];
    }

    delid(id:string){
        console.log("delid: ",id);
        this.files = this.files.filter((f)=>f.fileid !== id);
    }


//#region Clinning
    private _promis_clinning :any = undefined;
    private Clinning(){
        // console.log("Clinning files: ",this.files);
        const currentTime = Date.now();

        const fileOnDelet:DownloadData[] = [];
        this.files.forEach(f=>{
            if(f.status === DownloadStatus.downloaded || 
            f.status ===  DownloadStatus.download_error){
                if(f.timeEnd + DeleteEnd < currentTime){
                    fileOnDelet.push(f);
                    if(f.status === DownloadStatus.downloaded){
                        this.countDownloaded--;
                    }else{
                        this.countDownloadError--;
                    }
                }                
            }
        });
        if(fileOnDelet.length>0){

            this.files = this.files.filter(f=>!fileOnDelet.includes(f))
        }

    }
//#endregion Clinning

//#region Pre-Download
    download(fileid:string):boolean{
        const f = this.filesID.find(fid=>fid=== fileid);
        if(!f){
            this.filesID.push(fileid);
            this.StartPreDownload();
        }
        return f === undefined;
    }

    private _pomise_pre_download : Promise<FileDataDB> | undefined = undefined;
    private async StartPreDownload(){
        if(this._pomise_download) return;

        const fileid = this.filesID.pop();
        if(!fileid) return;

        this._pomise_pre_download = GetFileDataDB(fileid);
        this._pomise_pre_download.then((res)=>{
            if(res.bufferID){
                this.files.push({
                    fileid: fileid,
                    fileData: res,
                    status: DownloadStatus.download,

                    downloadLoaded: 0,downloadProc:0,downloadSize:0,timeEnd:0,
                });
                this.countDownload++;
                this.StartDownload();
            }else{
                //todo: можень добавить оповищение о том что BufferID не существует
            }
        }).catch(()=>{
            //todo: Пока что не знаю нужно ли обробатывать undefined.
        }).finally(()=>{
            //todo: ....
            this._pomise_download = undefined;
            this.StartPreDownload();
        });
    }    
//#endregion Pre-Download


//#region Download
    private _pomise_download: any = undefined;
    private async StartDownload(){
        if(this._pomise_download) return;

        const file = this.files.find(f=>{return f.status ===  DownloadStatus.download})
        if(!file)return;
        if(!file.fileData.bufferID){
            this.files = this.files.filter(f=>f !== file);            
            this.countDownload--;
            this.StartDownload();
            return;
        }

        file.status = DownloadStatus.downloading;

        this.countDownload--;
        this.countDownloading++;
        

        this._pomise_download = DownloadFile(file).then((res)=>{
            console.log("then res ",res);
            file.status = DownloadStatus.downloaded;
            this.countDownloaded++;
            this.countDownloading--;
            SaveFile(res, file.fileData.name);
        }).catch(()=>{
            file.status = DownloadStatus.download_error;
            this.countDownloadError++;
            this.countDownloading--;
        }).finally(()=>{
            file.timeEnd = Date.now();
            // this.countDownloading--;
            this._pomise_download = undefined;
            this.StartDownload();
        });

        
    }
//#endregion Download
}


const downloadStore = new DownloadStore();  
export default downloadStore;








// interface DownloadResult{
//     buffer: Buffer;
//     fileInfo: FileDataDB;
// }

// export async function DownloadFileOld(file:DownloadData):Promise<DownloadResult | undefined>{
//     return new Promise(async(resolve,reject)=>{
//         try {
//             const res = await axios.get(GetBackendURL(`/fileinfo/${file.fileid}`),{ withCredentials:true, });
//             console.log("DownloadFile res: ",res);
//             if(res.status !== 200){
//                 resolve(undefined);
//                 return;
//             }
//             const fileInfo = res.data as FileDataDB;
//             if(!fileInfo.bufferID){
//                 resolve(undefined);
//                 return;
//             }
            
//             const res2 = await axios.get(GetBackendURL(`/downloadfile/${fileInfo.bufferID}`),{
//                 withCredentials:true,responseType: 'arraybuffer',
//                 onDownloadProgress(progressEvent) {
//                     file.downloadLoaded = progressEvent.loaded;
//                     file.downloadSize = progressEvent.total || 0;
//                     file.downloadProc = progressEvent.progress || 0;
//                     console.log("onDownloadProgress: ",progressEvent);
//                 },
//             });

//             if(res2.status === 200){
//                 resolve({
//                     fileInfo: fileInfo,
//                     buffer: res2.data as Buffer,
//                 });
//                 return;
//             }else{                
//                 resolve(undefined);
//                 return;
//             }
//         } catch (error) {        
//             console.log("DownloadFileOld error: ",error);
//             reject("3698304683946893486348963496");
//         }
//     });
// }






// private _pomise_download: any = undefined;
// private async StartDownload(){
//     if(this._pomise_download) return;

//     const file = this.files.find(f=>{return f.status ===  DownloadStatus.downLoad})
//     if(!file)return;

//     this._pomise_download = DownloadFile(file).then((res)=>{
//         // console.log("DownloadFile buffer: ",res);
//         if(res){
//             file.status = DownloadStatus.downloaded;
//             SaveFile(res.buffer,res.fileInfo.name);
//         }
//         else{
//             file.status = DownloadStatus.download_error;
//         }                
//     }).catch(()=>{
//         file.status = DownloadStatus.download_error;
//     }).finally(()=>{
//         this._pomise_download = undefined;
//         this.StartDownload();
//     });
    

//     if(!this._pomise_download){
//         const file = this.files.find(f=>{return f.status ===  DownloadStatus.downLoad})
//         if(!file)return;

//         // console.log("StartDownload file:",file);
//         file.status = DownloadStatus.downloading;

//         this._pomise_download = DownloadFile(file).then((res)=>{
//             // console.log("DownloadFile buffer: ",res);
//             if(res){
//                 file.status = DownloadStatus.downloaded;
//                 SaveFile(res.buffer,res.fileInfo.name);
//             }
//             else{
//                 file.status = DownloadStatus.download_error;
//             }                
//         }).catch(()=>{
//             file.status = DownloadStatus.download_error;
//         }).finally(()=>{
//             this._pomise_download = undefined;
//             this.StartDownload();
//         });
//     }
// }















    // downloadFile(fileid:string):boolean{
    //     const f = this.files.find(v=>v.fileid === fileid);
    //     if(!f){
    //         this.files.push({
    //             fileid:fileid,
    //             status:DownloadStatus.downLoad,
    //             downloadLoaded:0,downloadSize:0,downloadProc:0,
    //         });
    //     }
    //     // console.log(`downloadFile (${fileid})`);
    //     this.StartDownload();
    //     return f === undefined;
    // }














// fileIsDownloading(fileid:string):boolean{
    //     if(fileid){
    //         const file = this.files.find(f=>{return f.fileid === fileid;});
    //         return file ? file.status === DownloadStatus.downloading : false;
    //     }else return false;
    // }









// const res = await axios.get(GetBackendURL(`/downloadfile/${file.fileid}`),{
//     withCredentials:true,
//     responseType: 'arraybuffer'
// });





// downloadFile(fileid:string){
//     if(fileid){
//         this.filesid.push(fileid);
//     }
//     console.log(`downloadFile (${fileid})`);
// }

// fileIsDownloading(fileid:string):boolean{
//     if(fileid){
//         return this.filesid.includes(fileid);
//     }else return false;
// }






    // fileIsDownloading(fileid:string):boolean{
    //     if(fileid){
    //         const file = this.files.find(f=>{return f.fileid === fileid;});
    //         return file !== undefined;
    //     }else return false;
    // }










    
        // console.log('test2', Date.now())

        // this.files = this.files.filter(f=>{
        //     if(f.status === DownloadStatus.downloaded || 
        //     f.status ===  DownloadStatus.download_error){
        //         return f.timeEnd + DeleteEnd < currentTime;
        //     }
        //     else{
        //         return false;
        //     }
        // })