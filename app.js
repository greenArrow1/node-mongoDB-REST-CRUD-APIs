const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const mongoose = require('mongoose');
const path=require('path');

mongoose.connect('mongodb://Chittrang:Mongo%401234@initialcluster-shard-00-00-2eszi.mongodb.net:27017,initialcluster-shard-00-01-2eszi.mongodb.net:27017,initialcluster-shard-00-02-2eszi.mongodb.net:27017/test?ssl=true&replicaSet=InitialCluster-shard-0&authSource=admin&retryWrites=true',
{ useNewUrlParser: true })
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist')));
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=> {
    res.status = (error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});
module.exports = app;