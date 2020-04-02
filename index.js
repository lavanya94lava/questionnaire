const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server on port ${port}`);
    }
    console.log(`server running on port ${port}`);
});
