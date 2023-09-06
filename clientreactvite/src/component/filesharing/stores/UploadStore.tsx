import { makeAutoObservable } from "mobx";
import { fileBlobToArrayBuffer_Promise } from "../utils/Utils";
import { GetBackendURL } from "../../../common/Backend";
import axios, { AxiosProgressEvent } from "axios";
import { UploadFile } from "../Actions/Actions";
import { FileOnUpload, FileStatus, IsFile, UrlIsExist } from "../Actions/Structures";
import { UpdateFilesStore } from "./FilesStore";


export class UploadStore{    
    filesOnUpload: FileOnUpload[] = [];
    
    constructor(){        
        makeAutoObservable(this);
    }

    addFiles(urlid:string, files:File[]){
        files.forEach((f)=>{
            const fu : FileOnUpload = {
                file:f,
                isFile: IsFile.DONT_KNOW,

                urlid:urlid,
                urlIsExist: UrlIsExist.DONT_KNOW,

                size:0,
                loaded:0,
                status:FileStatus.onupload,
                total:0,
                procentUploaded:0
            }
            this.filesOnUpload.push(fu);
        });

        this.StartUploadFiles();
    }

    // changeStatus(){}

    
    private _promis34636:Promise<boolean> | undefined;
    private async StartUploadFiles(){        
        if(!this._promis34636){
            const file = this.filesOnUpload.find((f)=>{return f.status === FileStatus.onupload});
            if(!file)return;

            file.status = FileStatus.uploading;

            this._promis34636 = UploadFile(file.urlid,file);
            this._promis34636.then((res)=>{
                if(res){
                    file.status = FileStatus.uploaded;
                    UpdateFilesStore(file.urlid);
                }
                else{
                    file.status = FileStatus.upload_error;
                }
            }).finally(()=>{
                console.log("FINALLY");
                this._promis34636 = undefined;
                this.StartUploadFiles();
            });
        }
    }
}
const uploadStore = new UploadStore();  
export default uploadStore;

