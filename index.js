const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./config/db.config');
// const redis = require("redis");
// const client = redis.createClient();
app.use(bodyParser.json());
app.use(cors());
const carRoutes = require('./src/routes/api.route');
app.use('/api/cars', carRoutes);

// client.set(key, value, function(err, reply) {
//   console.log(reply);
// });

// client.get(key, function(err, reply) {
//   console.log(reply);
// });
// MongoDB Connection
dbConfig.connect((err)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }else{
        app.listen(3000,()=>{
            console.log("listen and db connected");
        })
    }
})
