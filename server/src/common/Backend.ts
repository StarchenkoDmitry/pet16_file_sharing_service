const URL_BACKEND = "http://127.0.0.1:3066";
// const URL_BACKEND = "http://192.168.0.167:3066";
// const URL_BACKEND = "http://:3066";

export function GetBackendURL(str:string){
    return URL_BACKEND + str;
}
