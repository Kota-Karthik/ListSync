const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect=mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res)=>{
    console.log("Database connected");
})
.catch((err)=>{
console.log("Error while connecting",err);
});