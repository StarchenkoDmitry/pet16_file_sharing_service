


import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'


const TOKEN_NAME :string= "TokenID"
const TOKEN_SECRET:string  = "3460934568568340963408697";


// function authenticateToken(req:Request, res:Response, next:any) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     // req.user = user
//     next()
//     })
// }