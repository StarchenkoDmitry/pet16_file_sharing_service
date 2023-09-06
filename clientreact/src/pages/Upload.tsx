import './Сommon.css';

import MainLayer from "../component/layer/MainLayer";
import ChoseUrl from "../component/filesharing/ChoseUrl";
import { useParams, useSearchParams } from "react-router-dom";
import UploadFiles from "../component/filesharing/UploadFiles";
import FileManager from '../component/filesharing/manager/FileManager';
import DownloadPanel from '../component/filesharing/download/DownloadPanel';
import UploadPanel from '../component/filesharing/upload/UploadPanel';



export default function Upload() {
    let { id } = useParams();

    if(!id){id=""}

    
    const zagluska = (()=>{
        let list = [];
        for(let p = 0;p< 40;p++){
            list.push(<div key={p}>Test{p}</div>);
        }
        return list;
    })();

    const mainContent = id.length > 0 ? 
        <FileManager id={id}></FileManager> : <div>ID не указан.</div>
    
    
    return(
        <MainLayer>
            <div className="main-block">
                <div className="main-contaner">
                    <div className="block-left">
                        <ChoseUrl></ChoseUrl>
                    </div>
                    <div className="block-right">
                        {/* <DownloadPanel/> */}
                        <UploadPanel/>
                        { mainContent }
                    </div>
                </div>
                {/* { zagluska } */}
            </div>
            {/* <NUploadList/> */}
        </MainLayer>
    );
}





// return(
//     <MainLayer>
//         <Fillter></Fillter>
//         <div className="block-main">
//             <ChoseUrl></ChoseUrl>
//             <Fillter></Fillter>
//         </div>         
//     </MainLayer>
// );




// if(typeof window !== "undefined")
// window.location.replace("/");



// const router = useRouter();
// router.reload();