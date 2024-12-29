import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose
  .connect(process.env.mongoDBURL)
  .then(()=>{
    console.log("Connected");
  }).catch((error)=>{
    console.log(error);
  });

const app=express();

app.listen(3000,()=>{
  console.log('Listening on 3000');
})