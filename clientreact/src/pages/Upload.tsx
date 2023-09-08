import './Сommon.css';

import MainLayer from "../component/layer/MainLayer";
import ChoseUrl from "../component/filesharing/ChoseUrl";
import { useParams, useSearchParams } from "react-router-dom";
import FileManager from '../component/filesharing/manager/FileManager';
import UploadPanel from '../component/filesharing/upload/UploadPanel';


export default function Upload() {
    let { id } = useParams();
    if(!id){id=""}


    const mainContent = id.length > 0 ? 
        <FileManager id={id}></FileManager> : <div>ID не указан.</div>
    
    
    return(
        <MainLayer>
            <div className="main-block">
                <div className="main-contaner">
                    <div className="block-left">
                        <ChoseUrl></ChoseUrl>
                    </div>
                    <div className="block-right">
                        <UploadPanel/>
                        { mainContent }
                    </div>
                </div>
            </div>
        </MainLayer>
    );
}
