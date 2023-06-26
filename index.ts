import express from 'express'
import dotenv from 'dotenv'
import { initializeDatabase } from './src/configs/database'
import userRouter from './src/routes/user'
import { globalErrorHandler } from './src/errors/globalErrorHandler'

dotenv.config()

const app = express()
const port = process.env.PORT

initializeDatabase()

app.use(express.json())

app.use("/user", userRouter)

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})