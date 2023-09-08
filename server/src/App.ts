import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import filesRouter from './routers/FilesRouter.js';
import urlsRouter from './routers/UrlsRouter.js';
import buffersRouter from './routers/BuffersRouter.js';
import { PORT, SICKRET_COOKIES } from './config/Config.js';


var app = express();


app.use(express.json({limit: 64* 1000*1000,
  // verify: function (req:any, res, buf, encoding) {
  //   console.log("express.json: ",buf);
  //   req.rawBody = buf;
  // }
}))


app.use(bodyParser.raw({
  verify(req:any, res, buf, encoding) {
    req.rawBody = buf;
    // console.log("buf: ",buf);
  },
  limit:256* 1024*1024,
  type: '*/*'
}))


app.use(cookieParser(SICKRET_COOKIES));
app.use(cors( { origin:true,  credentials: true}))


//Routers:
app.use('/', buffersRouter)
app.use('/', filesRouter)
app.use('/', urlsRouter)


export default function StartExpressServise(){
  app.listen(PORT)
  console.log(`Server started on port(${PORT})`);
}