import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'
import authRouter from './routes/auth.js'
import { notFound } from './middleware/notFound.js'
import { logger } from './middleware/loger.js'
import { errorHandler } from './middleware/errorHandler.js'
import uplodeRouter from './routes/uplode.js'
import TransactionsRouter from './routes/transactions.js'
import helmet from 'helmet';
import { limiter } from './middleware/rateLimiter.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utility/swagger.js'
const app=express()
app.use(logger)
dotenv.config()
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "blob:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use(express.json())
app.use(cors({
     origin:"http://localhost:5173"
}))
app.use(limiter)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
const port=process.env.PORT||3000
mongoose.connect(process.env.NODE_ENV=="development"?process.env.MONGO_URI_DEV:process.env.MONGO_URI_PRO)
        .then(()=>console.log('database is working'))
        .catch(()=>console.log('there is error database'))
// midleware
app.use('/api/auth',authRouter)
app.use('/api/uplode',uplodeRouter)
app.use('/api/transactions',TransactionsRouter)

// ser frontent in production
if(process.env.NODE_ENV==="production"){
  const _dirname=path.dirname(fileURLToPath(import.meta.url))
  app.use(express.static(path.join(_dirname,'../frontend/dist')))
     // Serve the frontend app
     app.get(/.*/,(req,res)=>{
      res.send(path.join(_dirname,'..','frontend','dist','index.html'))
     })
}
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log('server is running')
})