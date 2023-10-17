import mongoose,{Schema} from "mongoose";

const esquema=mongoose.Esquema=(
    {
        alias: { type: String, required: true, trim: true },
       
        correo: {type: String},
        comentarios:{type: String, trim: true}
      }
)
export default mongoose.model ("Task", esquema)