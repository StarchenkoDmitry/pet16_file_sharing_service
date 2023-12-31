import { makeAutoObservable } from "mobx";
import { SaveFile } from "../Actions/Actions";
import { FileDataDB } from "../../../common/Structures";
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

    signalAbort?: AbortController;

    timeEnd: number;

    onDownloadProgress?:EventOnDownloadProgress;
}

const TimeClinning = 200;
const TimeDeleteEndFile = 2000;

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
    }

    private async Init(){
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

    getCountDownloadDownloading():number{
        return this.countDownload + this.countDownloading;
    }

    getCountAll():number{
        return this.countDownload+this.countDownloading+
        this.countDownloaded+this.countDownloadError;
    }

    //TODO: не уверен рабочий ли код
    changePorydocFiles(){
        if(this.files.length < 2)return;
        const file = this.files.slice(0,1);
        const files = this.files.slice(1,this.files.length);
        this.files = [...files,...file];
    }

    cancel(file:DownloadData){
        console.log("donwload cancel: ",file);
        // this.files = this.files.filter((f)=>f.fileid !== id);
        if(file.status === DownloadStatus.download || file.status === DownloadStatus.downloading){
            
            file.signalAbort?.abort();
        }
    }

//#region Clinning
    private _promis_clinning :any = undefined;
    private Clinning(){
        const currentTime = Date.now();

        const fileOnDelet:DownloadData[] = [];
        this.files.forEach(f=>{
            if(f.status === DownloadStatus.downloaded || 
            f.status ===  DownloadStatus.download_error){
                if(f.timeEnd + TimeDeleteEndFile < currentTime){
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
        if(this._pomise_pre_download) return;

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
            this._pomise_pre_download = undefined;
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
        file.signalAbort = new AbortController();

        this.countDownload--;
        this.countDownloading++;
        
        this._pomise_download = DownloadFile(file).then((res)=>{
            // console.log("then res ",res);
            file.status = DownloadStatus.downloaded;
            this.countDownloaded++;
            SaveFile(res, file.fileData.name);
        }).catch((res:any)=>{
            file.status = DownloadStatus.download_error;
            this.countDownloadError++;
        }).finally(()=>{
            file.timeEnd = Date.now();
            this.changePorydocFiles();
            this.countDownloading--;

            this._pomise_download = undefined;
            this.StartDownload();
        });

        
    }
//#endregion Download
}


const downloadStore = new DownloadStore();  
export default downloadStore;
