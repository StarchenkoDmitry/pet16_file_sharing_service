import StartExpressServise from "./ExpressApp.js";

// import {writeFile,readFileSync,existsSync}  from "fs";



StartExpressServise();



////TEST URL 
// await urlDB.Add({filesID:['LOL','BIB']});
// console.log(await urlDB.Get("64dbcd00cc908cc002363584"));
// console.log(await urlDB.Update({id:"64dbcd00cc908cc002363584",filesID:["ho",'da']}));
// console.log(await urlDB.Get("64dbcd00cc908cc002363584"));


//// Test no id in doc
// const obj = {filesID:['LOL','BIB']};
// await urlDB.Add(obj);
// console.log("OBJ: ",obj)
// console.log(await urlDB.Update({id:"64dbe0a0d2098ff9aaec148f",filesID:["ho",'da']}));




// ChankBlobServices.Get("64d2c2b4da93af333af89467");





// function Stop(){

//     console.log("Server stoped");
// }

// // process.on('SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGKILL', function() {
// //         /* DO SOME STUFF HERE */

// //         process.exit()
// //     });

// function signalHandler(signal:any) {
//     console.log("SIGNAL : ",signal);
//     Stop();
//     writeFile("log",""+ Math.random(),err=>{
//         if(err) console.log(err);
//         process.exit();
//     });
//     // process.exit()
// }

// // process.on('SIGINT', signalHandler)
// // process.on('SIGTERM', signalHandler)
// // process.on('SIGQUIT', signalHandler)
// // process.on('SIGKILL', signalHandler)

// const log = existsSync("log") && readFileSync("log");
// console.log("LOG: ",log);
// writeFile("log","3645675",()=>{});

// process.on("SIGINT",()=>{
//     //close SERVER 
//     signalHandler("");
//     Stop();

//     // process.exit();

//     // writeFile("log",JSON.stringify(messages),err=>{
//     //     if(err) console.log(err);
//     //     process.exit();
//     // });
// });
