import './FileManager.css';

import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { FilesList } from "./FilesList";
import { AddStore, FilesStore, FilesStoreProvider, LoadingStatus, RemoveStore, useFilesStore } from '../stores/FilesStore';
import uploadStore from '../stores/UploadStore';
import { GetMyJWT } from '../utils/Utils';

import copy from 'copy-to-clipboard';


const FileManagerComponent: FC =observer( ()=>{
    const store = useFilesStore();

    const canDeleteFiles = GetMyJWT() === store.JWTID;

//#region Drag and drop
    async function onDropHandler(event:any){
        event.stopPropagation();
        event.preventDefault();

        if(!event.dataTransfer) return;
        if(!event.dataTransfer.files) return;
        
        const files = [...event.dataTransfer.files] as File[];
        
        if(files.length > 0){
            uploadStore.addFiles(store.id,[...files]);
        }
    }    
    
    async function onDragOver(event:any){
        event.stopPropagation();
        event.preventDefault();
    } 
//#endregion  Drag and drop

    const ref = useRef<HTMLInputElement>(null)
    function AddFiles(){
        ref.current?.click();
    }
    function onInputFiles(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("test updateSize",event);
        const files:File[] =  Array.from(event.target.files || []);
        if(files.length > 0){
            uploadStore.addFiles(store.id,[...files]);
        }
    }

    const copyUrlID = ()=>{
        const url = window.location.origin+"/upload/" + store.id;
        copy(url);
    }

    const contentLoading = <div>Content loading...</div>

    const contentError = <div>Error loading</div>

    const content = !store.loaded?
            contentLoading
        : !store.succesLoad ?
            contentError
        :
    <>
        <div className='fileManager-head'>
            <button className='glas-btn1 btn-urlid-copy' onClick={copyUrlID}>
                {store.id}
                <img src="/icon/copy.svg" alt="copy"/>
            </button>
            
            <button className='glas-btn1 btn-addfiles' onClick={AddFiles}>Add files</button>
            <input ref={ref} onChange={onInputFiles}
                    type="file" multiple style={{display:"none"}} />
        </div>
        {
            store.filesLoadingStatus === LoadingStatus.loaded ?
            <FilesList files={store.files} canDeleteFiles={canDeleteFiles}></FilesList> : 
            <div>Loading information of files.</div>
        }
    </>
    
    return (
        <div className="fileManager" onDrop={onDropHandler}  onDragOver={onDragOver}>
            {content}
        </div>
    )
});

export default function FileManager({id}:{id:string}){
    // const [store] = useState(()=>{return new FilesStore(id)});
    const store = new FilesStore(id);

    //todo: наверно нужно поменять useEffect на лаяутЭфект потомучто AddStore(store); и RemoveStore(store);
    useEffect(()=>{
        // console.log("Effect id: ", id);
        AddStore(store);
        return ()=>{
            // console.log("end Effect id: ", id);
            RemoveStore(store);
            store.DisposeClear();
        }
    })

    return(<FilesStoreProvider store={store}>
            <FileManagerComponent></FileManagerComponent>
        </FilesStoreProvider>)
}