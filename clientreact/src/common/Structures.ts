export interface UrlDataDB{
    id?:string;
    name:string;
    JWTID: string;
    filesID:string[];
}
export interface FileDataDB{    
    id?:string;
    
    name:string;
    size:number;
    lastModified:number;

    bufferID: string | null;
}
export interface FileBufferDataDB{
    id?:string;

    buffer:Buffer;
    size:number;
    nextid: string | null;
}