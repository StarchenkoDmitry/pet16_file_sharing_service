import './InsertFiles.css';

import { SyntheticEvent, createRef, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetBackendURL } from '../../common/Backend';
import { AddFilesOnUpload } from './stores/FilesStore';


const URL_create_url = GetBackendURL("/create_url");


export default function InsertFiles() {
    const navigate = useNavigate();

    const mem = useMemo(()=>{return { enable: true,  }},[]);

    useEffect(()=>{
        return ()=>{ mem.enable = false; }
    },[]);


    async function onDropHandler(event:any){
        event.stopPropagation();
        event.preventDefault();

        if(!event.dataTransfer) return;
        if(!event.dataTransfer.files) return;
        
        const files: File[] = [...event.dataTransfer.files]; 

        
        if(files.length > 0){
            const id = await createURLID();
            if(id.length > 0 && mem.enable){
                AddFilesOnUpload(files);
                navigate(`/upload/${id}`);
            }
        }
    }

    async function createURLID():Promise<string>{
        const res = await fetch(URL_create_url,{method:"POST"});
        const data = await res.json();
        // console.log("data: " , data);
        if(data.error) return "";
        return data.id;
    }
    
    async function onDragOver(event:SyntheticEvent){
        event.stopPropagation();
        event.preventDefault();
        // console.log("onDragOver ",event);
    }

    return (
        <div className="upload-container" onDrop={onDropHandler} onDragOver={onDragOver}>
            <span>Переместите сюда только файлы.</span>
            <span>Ограничение размера файла 126 MB.</span>
        </div>
    )
}






// const names = GetNames();

// {
//     names.map(e=>{return <span key={e}>{e}</span>})
// }



















// export default function InsertFiles() {

//     function onDropHandler(event:any){
//         event.stopPropagation();
//         event.preventDefault();

//         console.log("onDropHandler ",event);
//         console.log("originalEvent", event.dataTransfer);

//         // debugger;

//         if(!event.dataTransfer) return;
//         if(!event.dataTransfer.files) return;
        
        
//         const reader = new FileReader();
//         reader.onload = function (ev:any) {
//             const dfgd  = reader.result;
//             console.log("reader:" , reader);
//         };
//         reader.onerror = function(ev:any){
//             console.log("reader2:" , reader);
//             console.log("reader onerror:" , ev);
//         }

//         reader.readAsDataURL(event.dataTransfer.files[0]);

//         const efiles = event.dataTransfer.files;
//         console.log("efiles: ",efiles);

//         const files = [...efiles];
//         AddFilesOnUpload(files);
//         console.log("files: ",files);
//     }  
//     function onDragOver(event:SyntheticEvent){
//         event.stopPropagation();
//         event.preventDefault();
//         // console.log("onDragOver ",event);
//     }

//     const names = GetNames();

//     return (
//         <div className="block-files">
//             {
//                 names.map(e=>{return <span key={e}>{e}</span>})
//             }
//             <div className="upload-container" onDrop={onDropHandler} onDragOver={onDragOver}>
//                 <span>Переместите сюда только файлы.</span>
//                 <span>Ограничение размера файла 126 MB.</span>
//             </div>

            
//         </div>
//     )
// }




{/* <button onClick={ async ()=>{
    if(!referat.current) return;

    // downloadFileFromBlob(WCounter.fileres as unknown as Blob,"my-image.png");// as unknown as Blob
    const url = "http://127.0.0.1:3066/test20";

    const files = (referat.current as unknown as HTMLInputElement).files;
    if(!files) return;

    const fil = files[0];
    console.log("fil:",fil);
    console.log("files:",files);

    const fd = new FormData();
    fd.append("file",files[0]);
    fd.append("file2",files[1]);
    let response = await fetch(url,{
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data'},
        body: fd,
        credentials: 'include'  
    });
    let data = await response.json();
    console.log(data);

}}>TestCode1</button> */}















// {/* <div className="upload-container" onDrop={onDropHandler} 
// onDragEnter={onDragEnter}
// onDragLeave={onDragLeave}
// onDragOver={onDragOver}
// > */}



// function onDragEnter(event:SyntheticEvent){
//     event.preventDefault();
//     event.stopPropagation();
//     // console.log("onDragEnter ",event);
// }

// function onDragLeave(event:SyntheticEvent){

//     event.preventDefault();
//     event.stopPropagation();
//     // console.log("onDragLeave ",event);
// }











// export default function InsertFiles() {
//     const referat = useRef(null);


//     function ffdf(e:any){
//         const elem = referat.current as unknown as HTMLInputElement;
//         if(elem.files){
//             const fil = elem.files[0];
//             WCounter.fileres = fil;            
//             console.log("DropFile: ",fil);
//         }
//         console.log("DROP: ",e);
//     }

//     return (
//         <div className="block-files">
//             <span onDrop={(e)=>{console.log("Drop: "+ e)}}>Перетящи файлы сюда.</span>


//             <div className="upload-container35" style={{width:100, height:100}}>
//                 <input ref={referat} onDrop={ffdf} type="file" id="file_upload" multiple />
//             </div>
//             <button onClick={ async ()=>{
//                 if(!referat.current) return;

//                 // downloadFileFromBlob(WCounter.fileres as unknown as Blob,"my-image.png");// as unknown as Blob
//                 const url = "http://127.0.0.1:3066/test20";

//                 const files = (referat.current as unknown as HTMLInputElement).files;
//                 if(!files) return;

//                 const fil = files[0];
//                 console.log("fil:",fil);
//                 console.log("files:",files);

//                 const fd = new FormData();
//                 fd.append("file",files[0]);
//                 fd.append("file2",files[1]);
//                 let response = await fetch(url,{
//                     method: 'POST',
//                     // headers: { 'Content-Type': 'multipart/form-data'},
//                     body: fd,
//                     credentials: 'include'  
//                 });
//                 let data = await response.json();
//                 console.log(data);

//             }}>TestCode1</button>
//         </div>
//     )
// }

















// export default function InsertFiles() {
//     const referat = useRef(null);

//     function ffdf(e:any){
//         const elem = referat.current as unknown as HTMLInputElement;
//         if(elem.files){
//             const fil = elem.files[0];
//             WCounter.fileres = fil;            
//             console.log("DropFile: ",fil);
//         }
//         console.log("DROP: ",e);
//     }
//     // onDrop={ffdf} 

//     function onDropHandler(event:any){
//         event.preventDefault();
//         event.stopPropagation();
//         console.log("onDropHandler ",event);
//         if(!event.dataTransfer) return;
//         if(!event.dataTransfer.files) return;
//         const efiles = event.dataTransfer.files;
//         const files = [...efiles];
//         AddFilesOnUpload(files);
//         console.log("files: ",files);
//     }  
//     function onDragOver(event:SyntheticEvent){        
//         event.preventDefault();
//         event.stopPropagation();
//         // console.log("onDragOver ",event);
//     }

//     const names = GetNames();

//     return (
//         <div className="block-files">
//             {
//                 names.map(e=>{return <span key={e}>{e}</span>})
//             }
//             <div className="upload-container" onDrop={onDropHandler} 
//                 onDragOver={onDragOver}
//             >
//                 <label >Файлы:</label>
//                 <input className="upload-container_input"
//                 ref={referat} 
//                 type="file" multiple 
//                 />
//             </div>

//             <button onClick={ async ()=>{
//                 if(!referat.current) return;

//                 // downloadFileFromBlob(WCounter.fileres as unknown as Blob,"my-image.png");// as unknown as Blob
//                 const url = "http://127.0.0.1:3066/test20";

//                 const files = (referat.current as unknown as HTMLInputElement).files;
//                 if(!files) return;

//                 const fil = files[0];
//                 console.log("fil:",fil);
//                 console.log("files:",files);

//                 const fd = new FormData();
//                 fd.append("file",files[0]);
//                 fd.append("file2",files[1]);
//                 let response = await fetch(url,{
//                     method: 'POST',
//                     // headers: { 'Content-Type': 'multipart/form-data'},
//                     body: fd,
//                     credentials: 'include'  
//                 });
//                 let data = await response.json();
//                 console.log(data);

//             }}>TestCode1</button>
//         </div>
//     )
// }

























// export default function InsertFiles() {

//     const router = useRouter();

//     function onDropHandler(event:any){
//         event.stopPropagation();
//         event.preventDefault();

//         if(!event.dataTransfer) return;
//         if(!event.dataTransfer.files) return;
        
//         const efiles = event.dataTransfer.files;
//         // console.log("efiles: ",efiles);

//         const files = [...efiles]; 
//         const countAdded =  AddFilesOnUpload(files);
//         // console.log("files: ",files);
//         if(countAdded > 0){
//             router.replace(URL_UPLOAD);
//         }
//     }  
//     function onDragOver(event:SyntheticEvent){
//         event.stopPropagation();
//         event.preventDefault();
//         // console.log("onDragOver ",event);
//     }

//     return (
//         <div className="block-right">            
//             <div className="upload-container" onDrop={onDropHandler} onDragOver={onDragOver}>
//                 <span>Переместите сюда только файлы.</span>
//                 <span>Ограничение размера файла 126 MB.</span>
//             </div>            
//         </div>
//     )
// }