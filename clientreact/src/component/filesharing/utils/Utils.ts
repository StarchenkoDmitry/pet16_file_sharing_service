import Cookies from "js-cookie";

export const ConvertFileBlobToArrayBuffer = (blob:Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
    console.log("blob: ", blob);
    const reader = new FileReader();
    // reader.onload = () =>{
    //     console.log("blob: ", blob.size);
    //     console.log("onload.Buffer: ",reader.result as ArrayBuffer);
    //     resolve(reader.result as ArrayBuffer); 
    // }
    reader.onloadend = ()=>{
        resolve(reader.result as ArrayBuffer); 
    }
    reader.onerror = ()=>{ reject(); };
    reader.readAsArrayBuffer(blob);
});


export function RandomName(size:number = 8):string{
    let str = ""
    for(let p =0;p< size;p++){
        str+= Math.round(Math.random()*9);
    }
    return str;
}

//todo: доделать функцию
export function NormalayesSizeString(size:number):string{
    // const aMultiples = ["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB",];
    
    const kib = 1024;
    let text = "";

          if(size> kib*kib*kib*kib*kib*kib){
        text = size+ " EiB"
        size = Math.round(size /(kib*kib*kib*kib*kib*kib));
    }else if(size> kib*kib*kib*kib*kib){
        text = size+ " PiB"
        size = Math.round(size /(kib*kib*kib*kib*kib));
    }else if(size> kib*kib*kib*kib){    
        text = size+ " TiB"
        size = Math.round(size /(kib*kib*kib*kib));
    }else if(size> kib*kib*kib){
        text = size+ " GiB"
        size = Math.round(size /(kib*kib*kib));
    }else if(size> kib*kib){
        size = Math.round(size /(kib*kib));
        text = size+ " MiB"
    }else if(size> kib){
        size = Math.round(size /(kib));
        text = size+ " KiB"
    }else{
        text = size+ "byte"
    }
    return text;
}

export function GetMyJWT():string{
    const str = Cookies.get('JWT_ID')
    if(!str){
        return "";
    }else{
        let list = str.split(":")[1].split(".")[0] || "";
        return list;
    }
}