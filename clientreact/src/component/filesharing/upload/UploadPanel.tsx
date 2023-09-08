import './UploadPanel.css';

import uploadStore from '../stores/UploadStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const TimeCloseEmptyUploadPanel = 1500;

const UploadPanel: FC = observer(()=>{
    const countUpload = uploadStore.getCountOnUpload();
    
    const [showPanel,setShowPanel] = useState(false);
    const countUp = uploadStore.getCountUploadAndUploading();
    
    useEffect(()=>{
        if(countUp> 0 && !showPanel){ setShowPanel(true); }

        const timeoutId = countUp === 0 ? setTimeout(()=>{ 
            setShowPanel(false);
        },TimeCloseEmptyUploadPanel) : undefined;

        return ()=>{
            clearTimeout(timeoutId);
        }
    },[countUp]);

    const content = uploadStore.files.slice(0,2).map((f,i)=>
    <div key={i} className='upload-item'>
        <div className='upload-item-head'>
            <span className='name'>{f.file.name}</span>
            <div className='right'>
                <progress className='upload-item-progress' 
                    value={(f.uploadProc*100).toString()} max="100"/>
                <button className='glas-btn1 cancle'>Cancle</button>
            </div>
        </div>
    </div>);

    return(
        <div className='uploadPanel'    //none
        style={{display: countUp === 0 ? "none" : "block"}}>
            <div className='uploadPanel-head'>
                <h3>Загрузка файлов </h3>
                <span>{ countUpload ? `Ожидают ${countUpload}` : "" }</span>
            </div>
            <div className='uploadPanel-list'>
                {content}
            </div>
        </div>
    );
});
export default UploadPanel;