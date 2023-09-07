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
            { files.length === 0 ? EMPTY : 
                files.map((f)=>{
                    return(<FileView key={f.id} file={f} canDeleteFiles={canDeleteFiles} />)
                })
            }
        </div>
    )
}

const EMPTY = <div className='fileManager-empty'>
    <h3>Here is empty</h3>
</div>