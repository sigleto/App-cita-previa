import { Router } from "express";
import Task from "../Task.js";

const router=Router();

router.get('/',(req,res)=>res.send('esperando'))

//solicitud tipo GET (traer datos del backend)
router.get('/Contacto',async(req,res)=>{
    const verta=await(Task.find())
    res.send(verta)})


//metodo post para llevar datos a la base de datos
router.post('/Contacto', async (req, res) => {
    try {
      const nueva = new Task(req.body);
      await nueva.save();
       res.send(nueva);
      // Envía un correo con SendGrid
      const { alias, correo, comentarios } = req.body;
      const msg = {
        to: 'sigleto@gmail.com', // Reemplaza con tu dirección de correo
        from: 'trianabaresapp@gmail.com', // Reemplaza con la dirección de correo configurada en SendGrid
        subject: 'Nuevo envío de datos',
        text: `Se ha recibido un nuevo envío de datos:\n\nAlias: ${alias}\nCorreo: ${correo}\nComentarios: ${comentarios}`,
      };
  
      await sgMail.send(msg);
  
      res.status(200).json({ message: 'Datos guardados y correo enviado exitosamente' });
      console.log("Se ha enviado");alert("Se ha enviado");
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      res.status(500).json({ error: 'Error al procesar el formulario' });alert("No se ha enviado")
    }
  });
  

   
   export default router