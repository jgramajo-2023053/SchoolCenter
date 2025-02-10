'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import curseRoutes from '../src/curse/curse.routes.js'
import enrollmentRoutes from '../src/enrollment/enrollment.routes.js'
import userRoutes from '../src/user/user.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

//Configuraciones de express
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/user', authRoutes)
    app.use('/v1/curse', curseRoutes)
    app.use('/v1/enrollment', enrollmentRoutes)
    app.use('/v1/user2', userRoutes)
}

//Ejecutarmos el servidor
export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}