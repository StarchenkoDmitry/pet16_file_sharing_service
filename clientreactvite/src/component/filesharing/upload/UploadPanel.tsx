import './UploadPanel.css';



const NUploadList = ()=>{
    // console.log("render FileUpViewComponent");
    

    const filesList = [{
        name:"Photo1.png",
        size:1024,
        proc:.5,
    },{
        name:"AppDuckGame.exe",
        size: 10256186,
        proc:.8,
    }];


    const renderList = (()=>{
        const list:JSX.Element[] = [];
        let inc = 0;
        filesList.forEach(f=>{
            list.push(
            <div key={inc++} className='upload-item'>
                <div className='upload-item-head'>
                    <span className='name'>{f.name}</span>
                    <button className='glas-btn1 cancle'>Cancle</button>
                </div>
                <progress className='upload-item-progress' 
                    value={(f.proc*100).toString()} max="100"/>
            </div>);
        });
        return list;
    })();


    return(
        <div className='wrapper-upload'>
            <div className='inner-upload'>
                <div className='upload-zagolovok'>
                    <h3>Загрузка файлов </h3>
                    <h3></h3>
                </div>
                <div className='upload-list'>
                    {renderList}
                </div>
            </div>
        </div>
    );
}


export default NUploadList;