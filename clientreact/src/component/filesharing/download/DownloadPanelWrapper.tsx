import './DownloadPanelWrapper.css';
import DownloadPanel from './DownloadPanel';


const DownloadPanelWrapper = ()=>{
    return(
        <div className='wrapper-downloadPanel'>
            <div className='wrapper-downloadPanel-inner'>
                <DownloadPanel></DownloadPanel>
            </div>
        </div>
    );
}
export default DownloadPanelWrapper;