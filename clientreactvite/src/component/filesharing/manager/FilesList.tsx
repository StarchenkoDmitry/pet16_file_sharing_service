import './FilesList.css';

import FileView from "./FileView";
import { FileDataDB } from "../../../common/Structures";


export interface FilesListProps{
    files:FileDataDB[];
    canDeleteFiles:boolean;
}

export const FilesList = ({files,canDeleteFiles}: FilesListProps)=>{


    
    return (
        <div className='filesList'>
            {files.map((f)=>{return(<FileView key={f.id} file={f} canDeleteFiles={canDeleteFiles} />)})}
        </div>
    )
}










{/* <button className='glas-btn2 download'>Download</button> */}


// export const FilesList = ({files}: Props)=>{
//     return (
//         <div className='filesList'>
//             <div className='filesList-head'>
//                 Files
//             </div>

//             <div className="tableUpList">
//                 <div className="name">Name</div>
//                 <div className="size">Size</div>
//                 <div className="action">Action2</div>
//             </div>
//             <div>
//                 { files.map((f)=>{return(<FileView key={f.id} file={f}></FileView>)}) }
//             </div>
//         </div>
//     )
// }














// interface Props2{
//     files:FileOnUpload[];
// }

// export const FilesUpList = ({files}:Props2)=>{
//     return (
//         <>
//             <div className="tableUpList">
//                 <div className="name">Name</div>
//                 <div className="size">Size</div>
//                 <div className="action">Action</div>
//             </div>
//             <div>
//                 { files.map((f,i)=>{return(<FileUpView key={i} file={f}></FileUpView>)}) }
//             </div>
//         </>
//     )
// }