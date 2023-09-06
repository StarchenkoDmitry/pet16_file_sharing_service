import './FileManager.css';

import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { FilesList } from "./FilesList";
import { AddStore, FilesStore, FilesStoreProvider, LoadingStatus, RemoveStore, useFilesStore } from '../stores/FilesStore';
import uploadStore from '../stores/UploadStore';
import { GetMyJWT } from '../utils/Utils';
import Loading from './ui/Loading';


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
        if(ref.current){
            ref.current.click();
        }
    }
    function inputFiles(event: React.ChangeEvent<HTMLInputElement>) {
        // console.log("test updateSize",event);
        const files:File[] =  Array.from(event.target.files || []);
        if(files.length > 0){
            uploadStore.addFiles(store.id,[...files]);
        }
    }

    const copyUrlid = ()=>{
        alert("Urlid was copy to buffer");
    }

    const contentLoading = <Loading/>

    const contentError = <div>Error loading</div>

    const content = !store.loaded? contentLoading :
    !store.succesLoad ? contentError :
    <>
        <div className='fileManager-head'>
            <button className='glas-btn1 btn-urlid-copy' onClick={copyUrlid}>
                {store.name}
                <img src="/icon/copy.svg" alt="copy"/>
            </button>
            
            <button className='glas-btn1 btn-addfiles' onClick={AddFiles}>Add files</button>
            <input ref={ref} onChange={inputFiles}
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




// const FileManagerComponentObserver = observer(FileManagerComponent);

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





   {/* <label htmlFor="files" className="btn">Select Image</label>
                <input type="file" id="files" name="file" multiple />

        <input id="uploadInput"type="file" name="myFiles" onChange={updateSize} multiple />
        selected files: <span id="fileNum">0</span>; total size:
        <span id="fileSize">0</span> */}























// import './FileManager.css';

// import { FC, useEffect, useLayoutEffect, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { FilesList } from "./FilesList";
// import { FilesStore, FilesStoreProvider, useFilesStore } from '../stores/FilesStore';
// import uploadStore from '../stores/UploadStore';
// // import { FilesUpList } from "./upload/_old/FilesUpList";



// const FileManagerComponent: FC = ()=>{
//     // console.log("render UploadFilesComponent");
//     const store = useFilesStore();    
//     // console.log("UploadFiles id:",store.id);

//     return (
//         <div className="block-upload" onDrop={onDropHandler}  onDragOver={onDragOver}>
//             {/* <FilesUpList files={uploadStore.filesOnUpload}></FilesUpList> */}
//             <FilesList files={store.files}></FilesList>
//         </div>
//     )

//     async function onDropHandler(event:any){
//         event.stopPropagation();
//         event.preventDefault();

//         if(!event.dataTransfer) return;
//         if(!event.dataTransfer.files) return;
        
//         const files = [...event.dataTransfer.files];
        
//         // if(files.length > 0){
//         //     const f = CreateFileOnUpload(files[0])
//         //     store.addFileOnUpload(f);
//         // }

//         files.forEach((f)=>{
//             // store.addFileOnUpload(CreateFileOnUpload(f));
//             uploadStore.addFiles(store.id,[f]);
//         });
//     }   

//     async function onDragOver(event:any){
//         event.stopPropagation();
//         event.preventDefault();
//     }
// }


// const FileManagerComponentObserver = observer(FileManagerComponent);

// export default function FileManager({id}:{id:string}){
//     // const [store] = useState(()=>{return new FilesStore(id)});
//     const store = new FilesStore(id);
//     useEffect(()=>{
//         // console.log("Effect id: ", id);
//         return ()=>{
//             // console.log("end Effect id: ", id);
//             store.DisposeClear();
//         }
//     })

//     return(<FilesStoreProvider store={store}>
//             <FileManagerComponentObserver></FileManagerComponentObserver>
//         </FilesStoreProvider>)
// }





