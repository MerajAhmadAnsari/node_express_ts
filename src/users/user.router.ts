import express, {Request, Response} from "express"

export const userRouter = express.Router()

userRouter.get('/', (req: Request, resp: Response) => {
    resp.send("user get request handled!!")
})

userRouter.post('/', (req: Request, resp: Response) => {
    resp.send("user post request handled!!")
})