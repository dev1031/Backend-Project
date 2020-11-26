const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRouter = require('./routes/api.routes');

const PORT = 5000;
const app = express();


mongoose.connect('mongodb://localhost:27017/testUsers', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false } ,()=>{
    try {
        console.log('Database is connected!!')
    } catch (error) {
        throw new Error(error)
    }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',userRouter);

app.get('/', (req, res)=>{
    res.status(200).json({
        response: "inside get request"
    })
})

app.listen(PORT, ()=>{
    try {
        console.log(`Server is up and running at PORT: ${PORT}`)
    } catch (error) {
        throw new Error(error)
    }
})