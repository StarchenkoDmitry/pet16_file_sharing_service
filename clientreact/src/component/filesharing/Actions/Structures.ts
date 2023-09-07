export enum UrlIsExist{
    DONT_KNOW, NO,YES,
}
export enum IsFile{
    DONT_KNOW = 0, NO = 1, YES = 2
}
export enum FileStatus{
    upload = 0,
    uploading = 1,
    uploaded = 2,
    upload_error = 3,
}
export type EventOnUpdateProcent = (procent:number,loaded:number,totalSize:number)=>void;

export interface FileOnUpload{
    urlid:string;
    urlIsExist:UrlIsExist;

    file: File;
    size: number;
    isFile: IsFile;

    fileID?:string;
    bufferID?:string;

    status: FileStatus;

    signalAbort?: AbortController;

    uploadLoaded: number;
    uploadSize: number;
    uploadProc: number;
    
    onUpdateProcent?: EventOnUpdateProcent;
}




export interface FileOnDownload{    
    id: string;
    urlID: string;

    name: string;
    size: number;
    hash: string;
    lastModified: number;

    type: string;
    webkitRelativePath: string;
    
    downloaded: number;
    total: number;
    procentUploaded: number;
}

