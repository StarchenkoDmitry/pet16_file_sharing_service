import './Сommon.css';

import MainLayer from "../component/layer/MainLayer";
import ChoseUrl from '../component/filesharing/ChoseUrl';
import InsertFiles from '../component/filesharing/InsertFiles';


export default function Home() {
    return(
        <MainLayer>
            <div className="main-block">
                <div className="main-contaner">
                    <div className="block-left">
                        <ChoseUrl></ChoseUrl>
                    </div>
                    <div className="block-right">
                        <InsertFiles></InsertFiles>
                    </div>
                </div>
            </div>
        </MainLayer>
    );
}