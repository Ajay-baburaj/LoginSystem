const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./Routes/AuthRoutes')
const cookieParser = require('cookie-parser')


app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://localhost:27017/loginSystem',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err.message)
})




app.use(cookieParser())
app.use(express.json())
app.use("/",authRoutes)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen('3001',()=>{
    console.log('port is running at 3001')
})