import './ChoseUrl.css';

import { CSSProperties, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UrlDataDB } from '../../common/Structures';
import { DeleteUrlByID, GetMyUrlsInfo } from './Actions/Actions';
import CreateUrlForm, { CreateUrlResult } from './modal/CreateUrlForm';


enum LoadingState{
    loading,
    loaded,
    error,
}

export default function ChoseUrl() {
    const navigate = useNavigate();

    const [loadState,setLoadState] = useState(LoadingState.loading);
    const [urlsinfo,ulrsinfoSet]  = useState<null | UrlDataDB[]>(null);
    const reProm = useRef<Promise<UrlDataDB[]> | null>(null);

    const updateInfo =async ()=>{
        if(!reProm.current){
            setLoadState(LoadingState.loading);
            reProm.current = GetMyUrlsInfo(); 
            reProm.current.then((sa)=>{
                ulrsinfoSet(sa);
                setLoadState(LoadingState.loaded);
            }).catch(()=>{
                ulrsinfoSet(null);
                setLoadState(LoadingState.error);
            }).finally(()=>{
                reProm.current = null;
            });
        }
    }

    useEffect(()=>{
        updateInfo();
    },[]);

      
//#region ModalCreateUrl
    const [showModalCreateUrl,showModalCreateUrlSet] = useState(false);
    const openModalCreateUrl = ()=>{
        showModalCreateUrlSet(true);
    }

    const createResultHandler = (result: CreateUrlResult)=>{
        if(result.created){
            navigate(`/upload/${result.urlid}`);
            updateInfo();
        }else{}
        showModalCreateUrlSet(false);
    }
//#endregion ModalCreateUrl


    const deleteUrlByID = (id:string)=>{
        DeleteUrlByID(id).then(res=>{
            // console.log("deleteUrlByID: ",id,res,urlsinfo);
            if(urlsinfo){
                const nlist = urlsinfo.filter((v)=>{return v.id !== id });
                ulrsinfoSet([...nlist]);
            }
        });
    }

    const rendList = (us: UrlDataDB[])=>  (
        <div className='choseurl-list'>
            {us.map(u=>{return(
                <div key={u.id} className='choseurl-list-item'>
                    {/* <Link to={`/upload/${u.id}`}>{u.name} | {u.id}</Link> */}
                    <Link to={`/upload/${u.id}`}>{u.name}</Link>
                    <button className='glas-btn2 delete' onClick={ ()=>{
                        if(u.id) {deleteUrlByID(u.id);}
                    }}>
                        <img  src="/icon/delete.png" alt="copy"/>
                    </button>
                </div>
            )})}
        </div>
    )
    

    const renderList  = loadState === LoadingState.loading ? <div>Loading</div> 
    : loadState === LoadingState.error || !urlsinfo ? <div>ERROR LOADING</div> 
    : urlsinfo ? 
        rendList(urlsinfo)
    : <div>Url is not esxit.</div>;




    return (
        <div className='choseurl'>
            <div className='choseurl-head'>
                <h3>My Urls</h3>
                <button className='btn-openModalCreateurl glas-btn1' 
                        onClick={openModalCreateUrl}>
                    Create Url
                </button>
            </div>
            <nav>
                { renderList }
            </nav>
            { showModalCreateUrl && <CreateUrlForm handleResult={createResultHandler}></CreateUrlForm>}
        </div>
    )
}





    // const renderList  = loadState === LoadingState.loading ? <div>Loading</div> 
    // : loadState === LoadingState.error  ? <div>ERROR LOADING</div> 
    // : urlsinfo ? 
    //     rendList(urlsinfo)
    // : <div>Url is not esxit.</div>;







/* <ul>
  <li>Hummus</li>
  <li>Pita</li>
  <li>Green salad</li>
  <li>Halloumi</li>
</ul> */



    
    // let _promis :any= null
    // function CreateNewUrl(){
    //     if(!_promis){
    //         _promis = CreateUrl().then((result)=>{
    //             console.log("Result: ",result);
    //             if(result.created){
    //                 navigate(`/upload/${result.urlid}`);
    //             }else{
    //                 alert("Не получилось создать новую ссылку.")
    //             }
    //         });
    //     }
    // }