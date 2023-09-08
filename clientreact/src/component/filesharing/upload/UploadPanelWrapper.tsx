import './UploadPanelWrapper.css';

import UploadPanel from './UploadPanel';

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