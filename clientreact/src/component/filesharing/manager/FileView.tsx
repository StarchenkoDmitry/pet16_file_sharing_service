import './FileView.css';

import { GetMyJWT, NormalayesSizeString, SizeToSting } from "../utils/Utils";
import { useFilesStore } from "../stores/FilesStore";
import { FileDataDB } from "../../../common/Structures";
import downloadStore from "../stores/DownloadStore";
import { observer } from "mobx-react-lite";


interface Props{
    file:FileDataDB
    canDeleteFiles:boolean;
}

const FileViewObserver =  observer(({file,canDeleteFiles}:Props) =>{
    // console.log(`Render FileView(${file.id})`);

    const bufferIDisNull = file.bufferID === null;

    const store = useFilesStore();
    
    const downloadStart = (id?:string)=>{
        if(id) {
            console.log("downloadStart: ",downloadStore.download(id));
        }
    }

    const deleteFile = (id?:string)=>{
        if(id) store.deleteFile(id);
    }

    return (
        <div className='filesList-item'>
            <span className="name">{file.name}</span>
            <div className='size'>{NormalayesSizeString(file.size)}</div>
            <button disabled={bufferIDisNull} className='glas-btn2 download'
                onClick={()=>{downloadStart(file.id)}}>                            
                <img src="/icon/download.png" alt="copy"/>
            </button>
            <button disabled={!canDeleteFiles} className='glas-btn2 delete'
                onClick={()=>{deleteFile(file.id)}}>
                <img src="/icon/delete.png" alt="copy"/>
            </button>
        </div>
    )
});

const FileView = FileViewObserver;
export default FileView;















// const FileViewObserver =  observer(({file}:Props) =>{
//     console.log(`Render FileView(${file.id})`);
//     const store = useFilesStore();
//     const fileSize = SizeToSting(file.size);
//     const fileIsDownloading: boolean = file.id ? downloadStore.fileIsDownloading(file.id) : false;

//     const download = ()=>{
//         if(file.id)
//         downloadStore.downloadFile(file.id);
//     }

//     const deleteFile = ()=>{
//         if(file.id)
//         store.deleteFile(file.id)
//     }

//     return (
//         <div className="fileUpView">
//             <div className="name">{file.name}</div>
//             <div className="size">{fileSize}</div>
//             <button disabled={fileIsDownloading} onClick={download} className="download">Download</button>
//             <button disabled={fileIsDownloading} onClick={deleteFile} className="download">Delete</button>
//         </div>
//     )
// });

// const FileView = FileViewObserver;
// export default FileView;









// const dfdg = (pops:Props) => observer(({file}:Props)=>{
//     console.log(`Render FileView(${file.id})`);
//     const store = useFilesStore();
//     const fileSize = SizeToSting(file.size);
//     const fileIsDownloading: boolean = file.id ? downloadStore.fileIsDownloading(file.id) : false;

//     const download = ()=>{
//         if(file.id)
//         downloadStore.downloadFile(file.id);
//     }

//     const deleteFile = ()=>{
//         if(file.id)
//         store.deleteFile(file.id)
//     }

//     return (
//         <div className="fileUpView">
//             <div className="name">{file.name}</div>
//             <div className="size">{fileSize}</div>
//             <button disabled={fileIsDownloading} onClick={download} className="download">Download</button>
//             <button onClick={deleteFile} className="download">Delete</button>
//         </div>
//     )
// },);

// const FileView = ()=> observer(FileViewComponent(props))











// interface Props{
//     file:FileDataDB
// }


// export default function FileView({file}:Props) {
//     console.log(`Render FileView(${file.id})`);
//     const store = useFilesStore();
//     const fileSize = SizeToSting(file.size);
//     const fileIsDownloading: boolean = file.id ? downloadStore.fileIsDownloading(file.id) : false;

//     const download = ()=>{
//         if(file.id)
//         downloadStore.downloadFile(file.id);
//     }

//     const deleteFile = ()=>{
//         if(file.id)
//         store.deleteFile(file.id)
//     }

//     return (
//         <div className="fileUpView">
//             <div className="name">{file.name}</div>
//             <div className="size">{fileSize}</div>
//             <button disabled={fileIsDownloading} onClick={download} className="download">Download</button>
//             <button onClick={deleteFile} className="download">Delete</button>
//         </div>
//     )
// }















// import { FileInfo } from "@/common/Structs"


// interface Props{
//     file:FileInfo
// }


// export default function FileView({file}:Props) {
//     return (
//         <div className="block-fileui">
//             <div className="name">Name: {file.name}</div>
//             <div className="size">Size: {file.size}</div>
//         </div>
//     )
// }

