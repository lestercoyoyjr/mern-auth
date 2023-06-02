import express from "express";

const app = express();

// API Requests
app.get('/', (req,res) => {
    res.send('ok');
})

app.listen(4000);