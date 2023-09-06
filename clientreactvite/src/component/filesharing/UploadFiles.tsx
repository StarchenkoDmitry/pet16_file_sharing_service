import './UploadFiles.css';

import { FC, useEffect, useLayoutEffect, useState } from "react";
import { FilesStore, FilesStoreProvider, useFilesStore } from "./stores/FilesStore";
import { observer } from "mobx-react-lite";
import { FilesList } from "./manager/FilesList";
import uploadStore from "./stores/UploadStore";



// const UploadFilesComponent: FC = observer(()=>{
//     // console.log("render UploadFilesComponent");
//     const store = useFilesStore();
    
//     // console.log("UploadFiles id:",store.id);

//     return (
//         <div className="block-upload" onDrop={onDropHandler}  onDragOver={onDragOver}>
//             {/* <button onClick={()=>{DownloadFile("64dd61cfaf04d734af991124")}}>DOWNLOAD FILE</button> */}
//             {/* <FilesUpList files={uploadStore.filesOnUpload}></FilesUpList> */}
//             {/* <FilesList files={store.files}></FilesList> */}
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
// });


// export default function UploadFiles({id}:{id:string}){
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
//             <UploadFilesComponent></UploadFilesComponent>
//         </FilesStoreProvider>)
// }