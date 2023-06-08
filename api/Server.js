import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const secret = 'secret123';

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

app.get('/user', (req,res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id)
    .then(userinfo => {
        res.json(userinfo);
    });
})

app.post('/register', (req,res) => {
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({password:hashedPassword, email});
    user.save().then(userinfo => {
        jwt.sign({id:userinfo._id, email:userinfo.email}, secret, (err,token) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.cookie('token', token).json({id:userinfo._id, email:userinfo.email});
            }
        });
    })
})

app.listen(4000);