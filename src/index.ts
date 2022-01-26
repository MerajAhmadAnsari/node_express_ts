import * as dotenv from "dotenv"
import express, { Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

/**
 * get
 * GET http://localhost:9000/ping  ---> pong
*/
app.get("/ping", (req: Request, resp: Response) => {
    resp.status(200).send("pong")
})

/**
 * get with query param - 
 * GET http://localhost:9000/pingquery?msg=test ---> Hello test
 * GET http://localhost:9000/pingquery          ---> Hello undefined
 */
app.get("/pingquery", (req: Request, resp: Response) => {
    resp.status(200).send(`Hello ${req.query.msg}`)
})

// get with request param - GET http://localhost:9000/pingparam/11
/**
 * 
 */
app.get("/pingparam/:id", (req: Request, resp: Response) => {
    let finalMsg = ""

    if (req.params.id && req.params.id.length > 0)
        finalMsg = `Hello ${req.params.id}!!`
    else
        finalMsg = `Hello Express!!`

    resp.status(200).send(finalMsg)
})

// post


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})

