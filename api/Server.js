import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Todo from "./models/Todo.js";

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
        res.json({id:userinfo._id, email:userinfo.email});
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

app.post('/login', (req,res) => {
    const {email, password} = req.body;
    User.findOne({email})
    .then(userinfo => {
        // compare passwords
        const passOk = bcrypt.compareSync(password, userinfo.password);
        if(passOk){
            jwt.sign({id:userinfo._id, email:userinfo.email}, secret, (err,token) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.cookie('token', token).json({id:userinfo._id, email:userinfo.email});
                }
            });
        } else {
            res.sendStatus(401);
        }
    })
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').send();
})

// todo APIs
app.get('/todos', (req,res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    Todo.where({user:new mongoose.Types.ObjectId(payload.id)})
      .find((err,todos) => {
        res.json(todos);
      })
  });
  
  app.put('/todos', (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    const todo = new Todo({
      text:req.body.text,
      done:false,
      user:new mongoose.Types.ObjectId(payload.id),
    });
    todo.save().then(todo => {
      res.json(todo);
    })
  });
  
  app.post('/todos', (req,res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    Todo.updateOne({
      _id:new mongoose.Types.ObjectId(req.body.id),
      user:new mongoose.Types.ObjectId(payload.id)
    }, {
      done:req.body.done,
    }).then(() => {
      res.sendStatus(200);
    });
  });

app.listen(4000);