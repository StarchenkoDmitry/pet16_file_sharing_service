import './CreateUrlForm.css';

import { useMemo, useState } from "react"
import { CreateUrlWithName } from "../Actions/Actions"
import { RandomName } from "../utils/Utils"


export interface CreateUrlResult{
    created: boolean;
    urlid:string;
}

interface Props{
    handleResult: (result:CreateUrlResult )=>void;
}

export default function CreateUrlForm({handleResult}:Props){
    const [buttonEnable,buttonEnableSet] = useState(true);
    const [name,setName] = useState(()=>{return RandomName()});
    const mem:{promis:any} = useMemo(()=>{return {promis: null}},[]);
    
    const create = () => {
        if(!mem.promis){
            buttonEnableSet(false);
            mem.promis = CreateUrlWithName(name).then((result)=>{
                if(result.created){
                    handleResult(result);
                }else{
                    alert("Не получилось создать новую ссылку.")
                    buttonEnableSet(true);
                }
            });
        }
    }
    
    const close = ()=>{
        handleResult({created:false,urlid:""});
    }

    const changeEvent = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value)
    }

    return(
        <div className="wrapper-createUrlForm">
            <div className="createUrlForm">
                <button className='btn-close' disabled={!buttonEnable}
                    onClick={close}>X</button>
                <div className='innerDiv'>
                    <label >Имя</label>
                    <input onChange={changeEvent} value={name} name="name" type="text" required></input>
                </div>
                <button className='btn-create' disabled={!buttonEnable} 
                    onClick={create}>Создать</button>
            </div>
        </div>
    )
}