import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './Routes/routes.js';
const app=express()
dotenv.config();

mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB");
  })
.catch((error) => {
    console.log("Error al conectar a la base de datos:", error);
  });

  app.use(cors())
  app.use(express.json())
  app.use(router)
  app.listen(process.env.PORT||4000,()=>console.log("escuchando en 4000"))