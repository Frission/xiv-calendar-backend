import express from 'express'
import dotenv from 'dotenv'
import { initializeDatabase } from './src/data/db/database'
import userRouter from './src/routes/user/userRouter'

dotenv.config()

const app = express()
const port = 8000 // process.env.PORT

initializeDatabase()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})