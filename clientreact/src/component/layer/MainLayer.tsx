import './MainLayer.css';

import Header from "./Header";
import UploadPanel from '../filesharing/upload/UploadPanel';
import DownloadPanel from '../filesharing/download/DownloadPanel';
import DownloadPanelWrapper from '../filesharing/download/DownloadPanelWrapper';
import ThemeProvider, { useIsThemeDark } from './Theme/ThemeProvider';


interface Props{
    children:React.ReactNode;
}


const MainLayerCopmonetn = ({children}:Props)=>{    
    const isDark = useIsThemeDark();
    const dark = isDark ? " dark " : "";
    

    return (
        <main className={"wraper"+dark}>
            <Header/>
            {children}
            <DownloadPanelWrapper/>
        </main>
    )
}



const MainLayer = ({children}:Props)=>{    
    return (
        <ThemeProvider>
            <MainLayerCopmonetn>{children}</MainLayerCopmonetn>
        </ThemeProvider>
    )
}
export default MainLayer;