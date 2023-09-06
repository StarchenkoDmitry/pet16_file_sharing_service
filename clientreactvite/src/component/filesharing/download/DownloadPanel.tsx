import './DownloadPanel.css';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import downloadStore, { DownloadStatus } from '../stores/DownloadStore';


const MAX_OTIBRAZAT_DOWNLOAD = 2;

const DownloadPanel: FC = observer(()=>{
    console.log("Rendering DownloadPanel");
    

    const rendList = downloadStore.files.map(f=>{
        return(<div key={f.fileid} className='downloadPanel-item'>
        <div className="upload-item-head">
            <span className="name"> {f.fileid}</span>
            <button className="glas-btn1 cancle">Cancle</button>
        </div>
        <progress className="upload-item-progress" value={`${f.downloadProc*100}`} 
            max="100"></progress>
    </div>)});    

    return(
        <div className='downloadPanel' >
            <div className='donwloadPanel-head'>
                <h3>Downloading</h3>
                <span className='counter'>1 / 4</span>
            </div>
            <div className='donwloadPanel-list'>
                { rendList }
            </div>
        </div>
    );
});


export default DownloadPanel;











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
