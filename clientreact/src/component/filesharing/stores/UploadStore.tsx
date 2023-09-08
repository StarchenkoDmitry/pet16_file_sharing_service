import { makeAutoObservable } from "mobx";
import { UploadFile } from "../Actions/Actions";
import { FileOnUpload, FileStatus, IsFile, UrlIsExist } from "../Actions/Structures";
import { AddFileInFilesStore } from "./FilesStore";


export class UploadStore{
    files: FileOnUpload[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    getCountOnUpload(){
        return this.files.reduce((c,f)=>f.status === FileStatus.upload? c+1:c,0);
    }

    getCountFiles():number{
        return this.files.length;
    }

    private ClearUploaded(file:FileOnUpload){
        this.files = this.files.filter(f=>f!==file);
    }

    getCountUploadAndUploading(){
        return this.files.reduce((c,f)=>{
            if(f.status === FileStatus.uploading || f.status === FileStatus.upload)
                return c + 1;
            else
                return c;
        },0);
    }

    addFiles(urlid:string, files:File[]){
        files.forEach((f)=>{
            const fu : FileOnUpload = {
                file:f,
                isFile: IsFile.DONT_KNOW,

                urlid:urlid,
                urlIsExist: UrlIsExist.DONT_KNOW,

                status:FileStatus.upload,

                size:0,
                uploadLoaded:0,
                uploadSize:0,
                uploadProc:0,
            }
            this.files.push(fu);
        });

        this.StartUploadFiles();
    }

    
    private _promis34636:Promise<boolean> | undefined;
    private async StartUploadFiles(){        
        if(this._promis34636)return;

        const file = this.files.find((f)=>{return f.status === FileStatus.upload});
        if(!file)return;

        file.status = FileStatus.uploading;

        this._promis34636 = UploadFile(file.urlid,file);
        this._promis34636.then((res)=>{
            if(res){
                file.status = FileStatus.uploaded;
                AddFileInFilesStore(file);
            }
            else{
                file.status = FileStatus.upload_error;
            }
        }).finally(()=>{
            // console.log("FINALLY");
            this.ClearUploaded(file);
            this._promis34636 = undefined;
            this.StartUploadFiles();
        });
    }
}
const uploadStore = new UploadStore();  
export default uploadStore;

