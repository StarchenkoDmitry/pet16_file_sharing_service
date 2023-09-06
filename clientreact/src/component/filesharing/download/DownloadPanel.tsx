import './DownloadPanel.css';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import downloadStore, { DownloadStatus } from '../stores/DownloadStore';


const TimeToClosePanel = 1500;

const MaxRenderFiles = 2;

const DownloadPanel: FC = observer(()=>{
    // console.log("Rendering DownloadPanel");
    
    const [showPanel,setShowPanel] = useState(false);
    const countDown = downloadStore.getCountDownloadAndDownloading();

    const countAllDownload = downloadStore.getCountDownloadAndDownloading();
    const countDownloaded = downloadStore.getCountDownloaded();


    console.log("STATE: ",downloadStore.getCountDownload(),
    downloadStore.getCountDownloading(),
    downloadStore.getCountDownloaded(),
    downloadStore.getCountDownloadError())




    useEffect(()=>{
        if(countDown> 0 && !showPanel){ setShowPanel(true); }

        const timeoutId = countDown === 0 ? setTimeout(()=>{ 
            setShowPanel(false);
        },TimeToClosePanel) : undefined;

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
                <button onClick={()=>{downloadStore.delid(f.fileid);}} 
                className="glas-btn1 cancle">Cancle</button>
            </div>
            <progress className="upload-item-progress" value={`${f.downloadProc*100}`} max="100"></progress>
        </div>
    )});    

    return(
        <div className='downloadPanel' style={{ opacity: showPanel? 1: 1}} >
            <div className='donwloadPanel-head'>
                <h3>Downloading</h3>
                <span className='counter'>{countAllDownload} / {countDownloaded}</span>
            </div>
            <div className='donwloadPanel-list'>
                { rendList }
            </div>
        </div>
    );
});


export default DownloadPanel;








    // console.log("STATE: ",downloadStore.getCountDownload(),
    // downloadStore.getCountDownloading(),
    // downloadStore.getCountDownloaded(),
    // downloadStore.getCountDownloadError())









    // const countDownload = downloadStore.files.reduce((p,f)=>{
    //     return p + f.status ===DownloadStatus.downloading ? 1 : 0;
    // },0)

    // let countDownload = 0 , 
    //     countDownloading = 0, 
    //     countDownloaded = 0,
    //     countDownloadError = 0,
    // countFiles = 0;
    // downloadStore.files.forEach(f=>{
    //     countFiles++;
    //     f.status === DownloadStatus.downLoad ? countDownload++ : 
    //     f.status === DownloadStatus.downloading ? countDownloading++ :
    //     f.status === DownloadStatus.downloaded ? countDownloaded++ :
    //     countDownloadError++;
    // });
