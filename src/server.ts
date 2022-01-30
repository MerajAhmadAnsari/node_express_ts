import express from "express"
import cors from "cors"
import helmet from "helmet"
import morganMiddleware from './shared/morganMiddleware'
import { userRouter } from "./users/user.router"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(helmet())
app.use(cors())
app.use(morganMiddleware)

/**
 * User API
 */
app.use('/api/v1/users',  userRouter)

export default app

