import './InsertFiles.css';

import { SyntheticEvent, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AddFilesOnUpload } from './stores/FilesStore';
import { CreateUrl } from './Actions/Actions';


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
            const resultID = await CreateUrl();

            if(resultID.urlid && mem.enable){
                AddFilesOnUpload(files);
                navigate(`/upload/${resultID.urlid}`);
            }
        }
    }

    async function onDragOver(event:SyntheticEvent){
        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div className="insertFiles" onDrop={onDropHandler} onDragOver={onDragOver}>
            <span>Переместите сюда только файлы.</span>
            <span>Ограничение размера файла 126 MB.</span>
        </div>
    )
}