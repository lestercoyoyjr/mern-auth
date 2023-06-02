import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
}));


// DB Connection
await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', console.log);

// API Requests
app.get('/', (req,res) => {
    res.send('ok');
})

app.post('/register', (req,res) => {
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({password:hashedPassword, email});
    user.save().then(userinfo => {
        console.log(userinfo);
        res.send('');
    })
})

app.listen(4000);