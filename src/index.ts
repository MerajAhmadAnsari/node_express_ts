import app from './server'
import * as dotenv from "dotenv"
import logger from './shared/logger'

dotenv.config()
const PORT: number = parseInt(process.env.PORT as string, 10)

app.listen(PORT, () => {
    logger.info(`Server started at port ${PORT}`)
})