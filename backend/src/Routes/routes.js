import { Router } from "express";
import Task from "../Task.js";

const router=Router();

router.get('/',(req,res)=>res.send('esperando'))

//solicitud tipo GET (traer datos del backend)
router.get('/Contacto',async(req,res)=>{
    const verta=await(Task.find())
    res.send(verta)})


//metodo post para llevar datos a la base de datos
router.post('/Contacto',async(req,res)=>{
    const nueva=new Task(req.body) 
   await nueva.save()
   res.send(nueva);
     
   } )
   
   export default router