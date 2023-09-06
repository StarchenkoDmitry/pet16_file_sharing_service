import { makeAutoObservable } from "mobx";
import React from "react";
import { UploadFile } from "../Actions/Actions";
import axios from "axios";
import { GetBackendURL } from "../../../common/Backend";
import { FileDataDB, UrlDataDB } from "../../../common/Structures";
import { DeleteFilePromise, GetFileDatasPromise, GetUrlInfoPromise } from "./Actions";



export enum LoadingStatus{
    none,
    loading,
    loaded,
    error,
}

export class FilesStore{
    loaded: boolean = false;
    succesLoad: boolean = false; 

    id:string = "";

    name:string = "";
    filesID: string[] = [];
    JWTID: string = "";

    filesLoadingStatus: LoadingStatus = LoadingStatus.none;
    files: FileDataDB[] = [];

    constructor(id:string){
        this.id = id;
        // console.log("Store ID: ",id);
        makeAutoObservable(this);
        
        this.Initial();
    }

    DisposeClear(){
        // console.log("DisposeClear id: ", this.id);
    }

    private async Initial(){
        await this.UpdateInfo();
    }

    private setLoaded(loaded:boolean){
        this.loaded = loaded;
    }
    private setSuccesLoad(succesLoad:boolean){
        this.succesLoad = succesLoad;
    }
    private setLoadingStatus(status:LoadingStatus){
        this.filesLoadingStatus = status;
    }

    private setVariants(name:string,JWTID:string,filesID:string[]){
        this.name  = name
        this.JWTID = JWTID;
        this.filesID = filesID;
    }

    private setFiles(files:FileDataDB[]){
        this.files = files;
    }

    private _update_promis:Promise<UrlDataDB | undefined> | Promise<FileDataDB[] | undefined> | undefined;
    public async UpdateInfo(){
        if(this.id === "")return;

        if(!this._update_promis){
            this._update_promis = GetUrlInfoPromise(this.id);
            this._update_promis.then((res)=>{
                if(res){
                    // this.filesID = res.filesID
                    // this.JWTID = res.JWTID;
                    // this.name  = res.name
                    this.setVariants(res.name,res.JWTID,res.filesID);
                    // console.log("RES: ",this,res);

                    this.setLoaded(true);
                    this.setSuccesLoad(true);

                    this.setLoadingStatus(LoadingStatus.loading);
                    this._update_promis = GetFileDatasPromise(this.filesID)
                    this._update_promis.then((res)=>{
                        // console.log("GetFileDatasPromise RES: ",res);
                        if(res){
                            // this.files = res;
                            this.setFiles(res);
                            this.setLoadingStatus(LoadingStatus.loaded);
                        }else{
                            this.setFiles([]);
                            this.setLoadingStatus(LoadingStatus.error);
                        }
                        this._update_promis = undefined;
                    });
                }else{
                    this.setLoaded(true);
                    this.setSuccesLoad(false);

                    this.setFiles([]);

                    this._update_promis = undefined;
                }
            });
        }
    }


    
    fileOnDelete: string[] = [];
    deleteFile(fileid:string){
        this.fileOnDelete.push(fileid);
        this.StartDeleteFilesWhile();
    }

    
    private _promis34636:Promise<any> | null = null;
    private async StartDeleteFilesWhile(){        
        if(!this._promis34636){
            const fileid = this.fileOnDelete.shift();
            if(!fileid)return;

            this._promis34636 = DeleteFilePromise(this.id,fileid);

            this._promis34636.then(()=>{
                this._promis34636 = null;

                this.files = this.files.filter(f=>{return f.id !== fileid;});

                this.StartDeleteFilesWhile();
            }).catch(()=>{
                this._promis34636 = null;
                this.StartDeleteFilesWhile();
            });
        }
    }

    


    
    // addFileOnUpload(file:FileOnUpload){
    //     this.filesOnUpload = [file,...this.filesOnUpload];
    //     // console.log("addFileOnUpload: ",file);
    //     // this.StartUploadWhile();
    // }


    // private _promis:Promise<any> | null = null;
    // private async StartUploadWhile(){
    //     if(this.id === "") return;
    //     if(!this._promis){
    //         const file = this.filesOnUpload.find((f)=>{return f.state === FileState.onupload})
    //         if(!file)return;

    //         file.state = FileState.uploading;
            
    //         this._promis = UploadFilePromise(this.id,file);
    //         this._promis.then(()=>{
    //             this._promis = null;
    //             this.StartUploadWhile();
    //             console.log("Test then");
    //             this.UpdateInfo();//update info 
    //         }).catch(()=>{
    //             this._promis = null;
    //             this.StartUploadWhile();
    //             console.log("Test catch");
    //         });
    //     }
    // }


    // private __imp = 10;
    // Impulse(){
    //     this.__imp++;
    //     console.log(`Inpulse(${this.__imp})`)
    //     const [one,too] = this.filesOnUpload;
    //     this.filesOnUpload = [too,one];
    // }
}

//TODO: нужоо удалить этоооооо говно 
// function UploadFilePromise(id:string,file:FileOnUpload){
//     return new Promise(async (res:any,rej:any)=>{
//         const result = await UploadFile(id,file);        
//         file.state = result ? FileState.uploaded : FileState.upload_error;
//         if(result){
//             res()
//         }
//         else{
//             rej();
//         }
//     });
// }


const FilesStoreContext: React.Context<FilesStore> = React.createContext(new FilesStore(""));


interface FilesStoreProviderProps {
    // children:any; //JSX.Element | JSX.Element[],
    children: React.ReactNode;
    store: FilesStore;
}
export const FilesStoreProvider = ({ children, store }:FilesStoreProviderProps) => {
    return (
        <FilesStoreContext.Provider value={store}>
            {children}
        </FilesStoreContext.Provider>
    )
}
 

/* Hook to use store in any functional component */
export const useFilesStore = () => React.useContext(FilesStoreContext);






let filesOnUploadOnPage:File[] = []

export function AddFilesOnUpload(files: File[] ){
    filesOnUploadOnPage.push(...files);
}
export function IsFilesOnUpload():boolean {
    return filesOnUploadOnPage.length > 0;
}
export function ClearFilesOnUpload(){
    filesOnUploadOnPage = [];
}

export function GetFilesOnUpload():File[] {
    const files = filesOnUploadOnPage;
    ClearFilesOnUpload();
    return files;
}







let storeList :FilesStore[] = []
export function AddStore(fileStore:FilesStore){
    storeList.push(fileStore);
}
export function RemoveStore(fileStore:FilesStore){
    storeList = storeList.filter((s)=>s === fileStore);
}
export function UpdateFilesStore(urlid:string){
    storeList.forEach(s=>{
        if(s.id === urlid){
            s.UpdateInfo();
        }
    });
}
