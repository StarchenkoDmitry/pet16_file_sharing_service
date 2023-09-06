import './MainLayer.css';

import Header from "./Header";
import NUploadList from '../filesharing/upload/UploadPanel';


interface Props{
    children:React.ReactNode;
}

const MainLayer = ({children}:Props)=>{
    return (
        <main className="wraper">
            {/* <Header key={'345346367'}/> */}
            
            <Header/>
            {children}            
            <NUploadList/>
        </main>
    )
}
export default MainLayer;