import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';


const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
dotenv.config();

// DB Connection
await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true});

// API Requests
app.get('/', (req,res) => {
    res.send('ok');
})

app.post('/register', (req,res) => {
    const {email,password} = req.body;
})

app.listen(4000);