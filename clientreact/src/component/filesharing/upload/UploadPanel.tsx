import './UploadPanel.css';

import uploadStore from '../stores/UploadStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';


const TimeToClosePanel = 1500;

const UploadPanel: FC = observer(()=>{
    // console.log("render FileUpViewComponent");
    const countUpload = uploadStore.getCountOnUpload();
    
    const [showPanel,setShowPanel] = useState(false);
    const countUp = uploadStore.getCountUploadAndUploading();
    
    useEffect(()=>{
        if(countUp> 0 && !showPanel){ setShowPanel(true); }

        const timeoutId = countUp === 0 ? setTimeout(()=>{ 
            setShowPanel(false);
        },TimeToClosePanel) : undefined;

        return ()=>{
            clearTimeout(timeoutId);
        }
    },[countUp]);

    const content = uploadStore.files.slice(0,2).map((f,i)=>
    <div key={i} className='upload-item'>
        <div className='upload-item-head'>
            <span className='name'>{f.file.name}</span>
            <div className='right'>
                <progress className='upload-item-progress' 
                    value={(f.procentUploaded*100).toString()} max="100"/>
                <button className='glas-btn1 cancle'>Cancle</button>
            </div>
        </div>
    </div>);

    return(
        <div className='uploadPanel'
        style={{display: countUp === 0 ? "none" : "block"}}>
            <div className='uploadPanel-head'>
                <h3>Загрузка файлов </h3>
                <span>{ countUpload ? `Ожидают ${countUpload}` : "" }</span>
            </div>
            <div className='uploadPanel-list'>
                {content}
            </div>
        </div>
    );
});


export default UploadPanel;






    // const content = uploadStore.files.map((f,i)=>
    // <div key={i} className='upload-item'>
    //     <div className='upload-item-head'>
    //         <span className='name'>{f.file.name}</span>
    //         <div className='right'>
    //             <progress className='upload-item-progress' 
    //                 value={(f.procentUploaded*100).toString()} max="100"/>
    //             <button className='glas-btn1 cancle'>Cancle</button>
    //         </div>
    //     </div>
    // </div>);


    // const filesList = [{
    //     name:"Photo1.png",
    //     size:1024,
    //     proc:.5,
    // },{
    //     name:"AppDuckGame.exe",
    //     size: 10256186,
    //     proc:.8,
    // }];


    // const renderList = (()=>{
    //     const list:JSX.Element[] = [];
    //     let inc = 0;
    //     filesList.forEach(f=>{
    //         list.push(
    //         <div key={inc++} className='upload-item'>
    //             <div className='upload-item-head'>
    //                 <span className='name'>{f.name}</span>
    //                 <button className='glas-btn1 cancle'>Cancle</button>
    //             </div>
    //             <progress className='upload-item-progress' 
    //                 value={(f.proc*100).toString()} max="100"/>
    //         </div>);
    //     });
    //     return list;
    // })();










    // const UploadPanel: FC = observer(()=>{
    //     // console.log("render FileUpViewComponent");
        
    //     const content = uploadStore.files.map((f,i)=>
    //     <div key={i} className='upload-item'>
    //         <div className='upload-item-head'>
    //             <span className='name'>{f.file.name}</span>
    //             <button className='glas-btn1 cancle'>Cancle</button>
    //         </div>
    //         <progress className='upload-item-progress' 
    //             value={(f.procentUploaded*100).toString()} max="100"/>
    //     </div>);
    
    
    //     return(
    //         <div className='uploadPanel'>
    //             <div className='uploadPanel-head'>
    //                 <h3>Загрузка файлов </h3>
    //                 <h3></h3>
    //             </div>
    //             <div className='uploadPanel-list'>
    //                 {content}
    //             </div>
    //         </div>
    //     );
    // });
    
    
    // export default UploadPanel;