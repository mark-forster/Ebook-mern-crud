const express= require('express');
const cors= require('cors');
const app= express();
const mongoose= require('mongoose');
const indexRoute= require('./index')
const path= require('path');
const bodyParser= require('body-parser');
// Import Model
const Book= require('./models/Book');


app.use(cors());

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use('/uploads', express.static("uploads"));

app.get('/',(req,res)=>{
    res.send('<h1>Hello Welcome Node Express')
});
app.use('/', indexRoute);


app.get('**',(req,res)=>{
    res.sendStatus(404)
})
mongoose.connect('mongodb://127.0.0.1:27017/Book',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Database connection successful');
    app.listen(8000,()=>{
        console.log('Server is running on port 8000');
    })
});


