import './DownloadPanel.css';

import { observer } from 'mobx-react-lite';
import { CSSProperties, FC, useEffect, useState } from 'react';
import downloadStore from '../stores/DownloadStore';


const TimeCloseDownloadPanel = 1500;
const MaxRenderFiles = 2;

const DownloadPanel: FC = observer(()=>{
    
    const [showPanel,setShowPanel] = useState(false);
    const countDown = downloadStore.getCountDownloadDownloading();
    const countDownloaded = downloadStore.getCountDownloaded();

    const countALL = downloadStore.getCountAll();

    useEffect(()=>{
        if(countDown> 0 && !showPanel){ setShowPanel(true); }

        const timeoutId = countDown === 0 ? setTimeout(()=>{ 
            setShowPanel(false);
        },TimeCloseDownloadPanel) : undefined;

        return ()=>{
            clearTimeout(timeoutId);
        }
    },[countDown]);

    const files = downloadStore.files.slice(0,MaxRenderFiles);
    
    const rendList = files.map((f,i)=>{
        return(
        <div key={i} className='downloadPanel-item'>
            <div className="upload-item-head">
                <span className="name"> {f.fileData.name}</span>
                <button onClick={()=>{downloadStore.cancel(f);}} 
                className="glas-btn1 cancle">Cancle</button>
            </div>
            <progress className="downloadPanel-item-progress" value={`${f.downloadProc*100}`} max="100"></progress>
        </div>
    )});    

    const showStyle :CSSProperties =  !showPanel ? { display:"none" } : {};

    return(
        <div className='downloadPanel' style={showStyle} >
            <div className='donwloadPanel-head'>
                <h3>Downloading</h3>
                {
                    countALL > 0 && <span className='counter'>{countDownloaded} / {countALL}</span>
                }                
            </div>
            <div className='donwloadPanel-list'>
                { rendList }
            </div>
        </div>
    );
});
export default DownloadPanel;