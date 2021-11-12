import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from "./routes/router.js"
import userRouter from './routes/users.js'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
const URL = `mongodb://localhost:27017/posts`
const app = express()
app.use(cors())
app.use(bodyParser.json({limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}))
app.use('/user', userRouter)
app.use('/posts', router)
mongoose.connect(URL, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{

    app.listen(PORT, ()=>  console.log('connection established to database')  )
    
})

.catch((error)=>{
    console.log(error.message);
})
