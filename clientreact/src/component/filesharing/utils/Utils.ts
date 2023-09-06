import Cookies from "js-cookie";
import { useEffect, useState } from "react";


// import {Buffer} from 'buffer';
// export const fileBlobToArrayBuffer_Promise = (blob:Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () =>{
//         console.log("Resulst file : ",reader.result,reader.readyState);
//         // const buffer = Buffer.from(reader.result);
//         console.log("window.Buffer: ",Buffer);
//         // console.log("fileBlobToArrayBuffer_Promise Buffer: ",buffer);
//         resolve(reader.result as ArrayBuffer);
//     }
//     reader.onerror = ()=>{ reject(); };
//     reader.readAsArrayBuffer(blob);
// });

export const fileBlobToArrayBuffer_Promise = (blob:Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
    console.log("blob: ", blob);
    const reader = new FileReader();
    // reader.onload = () =>{
    //     console.log("blob: ", blob.size);
    //     console.log("onload.Buffer: ",reader.result as ArrayBuffer);
    //     resolve(reader.result as ArrayBuffer); 
    // }
    reader.onloadend = ()=>{
        // console.log("blob: ", blob.size);
        // console.log("onloadend.Buffer: ",reader.result as ArrayBuffer);
        resolve(reader.result as ArrayBuffer); 
    }
    reader.onerror = ()=>{ reject(); };
    reader.readAsArrayBuffer(blob);
});







export function SizeToSting(size: number):string{
    let sizeNormal = 0;
    let sufics = "";
    if(size > 1000000){
        sizeNormal =  Math.round(size/1000000);
        sufics = "mb";
    }
    else if(size > 1000){
        sizeNormal =  Math.round(size/1000);
        sufics = "kb";
    }
    else{
        sizeNormal =  size;
        sufics = "bytes";
    }
    return sizeNormal + " " + sufics;
}



export function useTimerok(milisecond: number = 1000){
    const [timer, setTimer] = useState(0);

    const addTimer = () => {
        // console.log('timer', timer);
        setTimer(timer + 1);
    }

    useEffect(() => {
        // console.log('Use effect');
        const handeler = setInterval(addTimer, milisecond);
        return ()=>{clearInterval(handeler);}
    })
}



export function RandomName(size:number = 8):string{
    let str = ""
    for(let p =0;p< size;p++){
        str+= Math.round(Math.random()*9);
    }
    return str;
}



//todo: доделать функцию
export function NormalayesSizeString(size:number):string{
    // const aMultiples = [
    //     "KiB",
    //     "MiB",
    //     "GiB",
    //     "TiB",
    //     "PiB",
    //     "EiB",
    //     "ZiB",
    //     "YiB",
    // ];
    // for(let p = 0;p < aMultiples.length;p++){
    // }
    // return "dft54635735735757"

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


// // optional code for multiples approximation
//         for (
          
//             nMultiple = 0,
//             nApprox = nBytes / 1024;
//           nApprox > 1;
//           nApprox /= 1024, nMultiple++
//         ) {
//           sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
//         }



export function GetMyJWT():string{
    const str = Cookies.get('JWT_ID')
    if(!str){
        return "";
    }else{
        let list = str.split(":")[1].split(".")[0] || "";
        return list;
    }
}
// console.log("COOKIES: ", document.cookie);
// console.log("GetMyJWT: ", GetMyJWT());