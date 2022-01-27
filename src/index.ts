import * as dotenv from "dotenv"
import express, { Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
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
 * get with query param
 * GET http://localhost:9000/pingquery?msg=test ---> Hello test
 * GET http://localhost:9000/pingquery          ---> Hello undefined
 */
 app.get("/pingquery", (req: Request, resp: Response) => {
    resp.status(200).send(`Hello ${req.query.msg}`)
})

/**
 * get with request param
 * GET http://localhost:9000/pingparam/11    ---> Hello 11!!
 */
app.get("/pingparam/:id", (req: Request, resp: Response) => {
    let finalMsg = ""

    if (req.params.id && req.params.id.length > 0)
        finalMsg = `Hello ${req.params.id}!!`
    else
        finalMsg = `Hello Express!!`

    resp.status(200).send(finalMsg)
})

/**
 * get with json request body
 * GET http://localhost:9000/pingreqbody with json - {"msg":"Get Request with request body"} ---> Hello Get Request with request body
 */
 app.get("/pingreqbody", (req: Request, resp: Response) => {
    resp.status(200).send(`Hello ${req.body.msg}`)
})

/**
 * get with url encoded request body
 * GET http://localhost:9000/pingformreqbody with url encoded data - msg: "url_encoded_data" ---> Hello "url_encoded_data"
 */
 app.get("/pingformreqbody", (req: Request, resp: Response) => {
    resp.status(200).send(`Hello ${req.body.msg}`)
})

/**
 * post
 * POST  http://localhost:9000/postjsondata with json - {"name":"testuser", "city" : "NY"} ---> {"Name": "testuser", "City": "NY" }
 */

 app.post('/postjsondata', (req:Request, resp:Response) => {
    resp.status(200).json({Name:req.body.name, City:req.body.city})
})

/**
 * post
 * POST  http://localhost:9000/postjsondatawithrequestparam/23 with json - {"name":"testuser", "city" : "NY"} --->{"Id":"23","Name":"testuser","City":"NY"}
 */

 app.post('/postjsondatawithrequestparam/:id', (req:Request, resp:Response) => {
    resp.status(200).send({Id:req.params.id, Name:req.body.name, City:req.body.city})
})

/**
 * post
 * POST  http://localhost:9000/postjsondatawithqueryparam?type=leave with json - {"name":"testuser", "city" : "NY"} ---> {"Type": "leave", "Name": "testuser", "City": "NY" }
 */

 app.post('/postjsondatawithqueryparam', (req:Request, resp:Response) => {
    resp.status(200).send({Type:req.query.type, Name:req.body.name, City:req.body.city})
})

/**
 * post
 * POST  http://localhost:9000/postjsondatawithrequestqueryparam/12?type=leave with json - {"name":"testuser", "city" : "NY"} ---> {"Id":"12","Type":"leave","Name":"testuser","City":"NY"}
 * POST http://localhost:9000/postjsondatawithrequestqueryparam/12?newtype= with json - {"name":"testuser", "city" : "NY"} ---> {"Id":"12","Name":"testuser","City":"NY"}
 * POST http://localhost:9000/postjsondatawithrequestqueryparam/12?type= with json - {"name":"testuser", "city" : "NY"} ---> {"Id":"12","Type":"","Name":"testuser","City":"NY"}
 * POST http://localhost:9000/postjsondatawithrequestqueryparam/14 with json - {"name":"testuser", "city" : "NY"} ---> {"Id":"14","Name":"testuser","City":"NY"}
 */

 app.post('/postjsondatawithrequestqueryparam/:id', (req:Request, resp:Response) => {
    resp.status(200).send({Id:req.params.id, Type:req.query.type, Name:req.body.name, City:req.body.city})
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})

