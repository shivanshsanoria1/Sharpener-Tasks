const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('in the middleware 1');
    next();
});

app.use((req,res,next) => {
    console.log('in the middleware 2');
    res.send('<h1>hello from Express</h1>');
    //res.send({key1: value});
    //res.send({key1: 10});
});

app.listen(3000);