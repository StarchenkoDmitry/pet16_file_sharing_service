import './MainLayer.css';

import Header from "./Header";
import UploadPanel from '../filesharing/upload/UploadPanel';
import DownloadPanel from '../filesharing/download/DownloadPanel';
import DownloadPanelWrapper from '../filesharing/download/DownloadPanelWrapper';


interface Props{
    children:React.ReactNode;
}

const MainLayer = ({children}:Props)=>{
    return (
        <main className="wraper">
            <Header/>
            {children}
            <DownloadPanelWrapper/>
        </main>
    )
}
export default MainLayer;