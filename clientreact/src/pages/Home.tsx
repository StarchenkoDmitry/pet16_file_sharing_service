//TODO: от рефакторить css что бы все было разделено там где оно длжно быть
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


// export default function Home() {

//     return(
//     <div>
//         <Header></Header>
//         <Fillter></Fillter>
//         <input type="file" name="filefield" multiple = {true} />
//         <button onClick={()=>{openFile();}}>Click File</button>
//     </div>
//     );
// }




// useEffect(()=>{
    //     console.log("init");
    //     return ()=>{console.log("del");}
    // });









// <Fillter></Fillter>
// <input type="file" name="filefield" multiple = {true} />
// <button onClick={()=>{openFile();}}>Click File</button>


// function openFile(){     
//     let inputElement = document.createElement('input');
//     inputElement.type = 'file';
//     // inputElement.webkitdirectory = true;
//     inputElement.setAttribute('multiple', 'true');
    

//     inputElement.onchange = async event => 
//     {
//         let files = inputElement.files;
//         if(!files) return;

//         const file = files[0];


//         // getBase64(file);

//         // console.log("SizeFile: " + file.size);
//         // console.log("file0: " + file.slice(0,20));
//         // console.log("file1: " + file.slice(0,10));
//         // console.log("file2: " + file.slice(10,20));
        
//         // console.log("file0: " + convertTOblob(file.slice(0,30)));
//         // console.log("file1: " + convertTOblob(file.slice(0,10)));
//         // console.log("file2: " + convertTOblob(file.slice(10,20)));
//         // console.log("file3: " + convertTOblob(file.slice(20,30)));

//         // console.log("f: " + convertTOblob(file));
//         // console.log("type: " +  file.type);
        
//         // console.log("type2: " + (await file.text()).length);
//         // console.log("lastModified: " + file.lastModified);
//         // // console.log("lastModified2: " + file.lastModifiedDate);



//         // const arr = Array.from(files);
//         // arr.forEach(f =>{
//         //     console.log(f.name);
//         //     console.log(f.webkitRelativePath);
//         //     // console.log(blobToBase64WithoutZapytay(f).then(bes=>{console.log(bes)}));
//         // });


//         const nameFile = "my-image.png";

//         const myArrayBuffer = await fileBlobToArrayBuffer_Promise(file) as ArrayBuffer;
//         const myArr = new Uint8Array(myArrayBuffer)
//         // var enc = new TextDecoder("utf-8");
//         // console.log("array: "+ enc.decode(myArrayBuffer.slice(0,myArrayBuffer.byteLength)));        
        
//         const myArrSize = myArr.byteLength;
//         console.log('size myArr: '+ myArrSize);
//         for(let p = 0;p < 10;p++){
//             console.log(myArr[myArrSize-10 + p]);
//         }

//         // myArrayBuffer.(function(element) {
//         //     console.log(element);
//         // });

//         // console.log("array:" , myArr);

//         // const nfile = new File([myArr], nameFile);
//         // console.log("nFile:" , nfile);

//         // saveAs(nfile,nameFile);
//         // saveFilesfdsf(nfile,nameFile);

//         // fs.appendFileSync(nameFile, Buffer.from(myArrayBuffer));




//         // const uInt8 = new TextEncoder().encode('StreamSaver is awesome')
//         // const streamSaver = require('streamsaver');
        
//         // const fileStream = streamSaver.createWriteStream('filename.txt', {
//         //   size: uInt8.byteLength, // (optional filesize) Will show progress
//         //   writableStrategy: undefined, // (optional)
//         //   readableStrategy: undefined  // (optional)
//         // });

//         // const writer = fileStream.getWriter();
//         // writer.write(uInt8);
//         // writer.close();







//         // if(files.length <=0) return;
//         // if(!files[0].type.includes("image/")) return;
//         // var base_image = new Image();
//         // base_image.src = URL.createObjectURL(files[0]);
//         // base_image.onload = l =>{
            
//         //     if(base_image.width <1 || base_image.height <1) return;

            
//         //     // setCanvSizeStyle(base_image.width,base_image.height);
//         //     // setCanvTopLeft(cavnDefX,cavnDefY);
//         //     // setCanvSizeContex2D(base_image.width,base_image.height);
//         //     // canvWidth = base_image.width;
//         //     // canvHeight = base_image.height;
//         //     // currentNumberScales = CONST_DEF_Sacle;
//         //     // drawFillBackground();
//         //     // ctx.drawImage(base_image, 0, 0);
//         // }
//     };
//     inputElement.click();
// }






// import Image from 'next/image'


// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })





// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/pages/index.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p
//             className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
//           >
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p
//             className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
//           >
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p
//             className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
//           >
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p
//             className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
//           >
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
