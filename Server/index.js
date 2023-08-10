const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./Models/User");
const router = require("./Controller/UserContoller");
const app = express();
const cookieParser = require('cookie-parser');
require("./Config/Db");
const jwt=require("jsonwebtoken");
const secret="iuecnegcrcekemwbfcnecwhbugjbrcfrcbencriecc";

app.use(
  cors({
    credentials:true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser);

app.use(router);

app.get('/profile',(res,req)=>{
  const {token}=req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{
if (err) throw err;
res.json(info);
  })
res.json(req.cookie);
})

app.listen(4000);
