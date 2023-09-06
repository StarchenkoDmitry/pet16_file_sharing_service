import UploadPanel from './UploadPanel';
import './UploadPanelWrapper.css';




const UploadPanelWrapper = ()=>{
    return(
        <div className='wrapper-uploadPanel'>
            <div className='wrapper-uploadPanel-inner'>
                <UploadPanel></UploadPanel>
            </div>
        </div>
    );
}


export default UploadPanelWrapper;