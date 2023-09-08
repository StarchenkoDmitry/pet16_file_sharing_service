import './FileView.css';

import { NormalayesSizeString } from "../utils/Utils";
import { useFilesStore } from "../stores/FilesStore";
import { FileDataDB } from "../../../common/Structures";
import downloadStore from "../stores/DownloadStore";
import { observer } from "mobx-react-lite";


interface Props{
    file:FileDataDB
    canDeleteFiles:boolean;
}

const FileView = observer(({file,canDeleteFiles}:Props) =>{
    const bufferIDisNull = file.bufferID === null;
    const store = useFilesStore();
    
    const downloadStart = (id?:string)=>{
        if(id) {
            downloadStore.download(id);
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

export default FileView;