import express,{ Request, Response} from 'express';
import cors from 'cors';
// import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import fileUpload, { UploadedFile } from 'express-fileupload'

import filesRouter from './routers/FilesRouter.js';
import urlsRouter from './routers/UrlsRouter.js';
import buffersRouter from './routers/BuffersRouter.js';


const port: number = 3066;
const SICKRET_COOKIES: string = "58568u56j9834096834986";


var app = express();

app.use(express.json({limit: 512* 1000*1000,
  // verify: function (req:any, res, buf, encoding) {
  //   console.log("express.json: ",buf);
  //   req.rawBody = buf;
  // }
}))
// app.use(express.json())


// app.use(bodyParser.urlencoded({
//   extended: true,
//   limit: 800* 1000*1000,
//   verify(req, res, buf, encoding) {
//     console.log("buf: ",buf,encoding);
//   },
//   // type: '*/*'
// }))

app.use(bodyParser.raw({
  verify(req:any, res, buf, encoding) {
    req.rawBody = buf;
    // console.log("buf: ",buf);
  },
  limit:800* 1000*1000,
  type: '*/*'
}))


app.use(cookieParser(SICKRET_COOKIES));
app.use(cors( { origin:true,  credentials: true}))


// app.use(fileUpload({ limits:{ fileSize: 64*1000*1000}, /* abortOnLimit: true, */ }))


//Routers:
app.use('/', buffersRouter)
app.use('/', filesRouter)
app.use('/', urlsRouter)



export default function StartExpressServise(){
  app.listen(port)
  console.log(`Server started on port(${port})`);
}







// app.post('/fileupload', function(req:Request, res:Response)  {
//   console.log("File uploading.");
//   // res.cookie('FH', '111111', { maxAge: 30000000, httpOnly: false});
//   // res.cookie('FH', '111111', { httpOnly: true, secure:true});
//   // console.log(req.signedCookies["username"])
//   if(!req.files) {res.status(202).send("eror"); return;}
//   const fi = req.files.file as UploadedFile;
//   // res.status(200).send('fileupload '+ fi.size);

//   console.log("File uploaded.");
//   res.status(200).json({
//     size:fi.size,
//     md5:fi.md5,
//     name:fi.name
//   });
// });





// app.use(bodyParser.json({
//   verify: function (req, res, buf, encoding) {
//       req.rawBody = buf;
//   }
// }));
// app.use(bodyParser.urlencoded({
//   extended: false,
//   verify: function (req, res, buf, encoding) {
//       req.rawBody = buf;
//   }
// }));