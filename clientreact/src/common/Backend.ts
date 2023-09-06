const URL_BACKEND = "http://127.0.0.1:3066";
//const URL_BACKEND = "http://192.168.0.167:3066";

export function GetBackendURL(str:string){
    //TODO : сделать проверку на первый символ str '/'
    return URL_BACKEND + str;
}

// export function ToUrl(str:string){
//     if(typeof window !== "undefined"){
//         window.location.replace(str);
//         // console.log("HREF: ", window.location.href);
//         // window.location.href = str;
//     }
// }