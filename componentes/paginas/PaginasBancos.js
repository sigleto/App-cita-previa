import React,{useEffect} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaginasBancos = ({entidades}) => {
   

    const bancosURL = {
        'Banco Santander':'https://www.bancosantander.es/particulares/banca-online/cita-previa',
        'Caixabank':'https://www.caixabank.es/particular/bancadistancia/cita-previa.html#',
        'Banco Sabadell':'https://www.bancsabadell.com/cita-previa/landing/index-es.html',
        'BBVA':'https://www.bbva.es/personas/banca-online/solicitar-cita-previa.html',     
        'Unicaja':'https://www.bbva.es/personas/banca-online/solicitar-cita-previa.html',
        'Abanca':'https://www.abanca.com/es/oficinas/cita-previa/',
        'Caixa Popular':'https://www.caixapopular.es/es/cita-previa',
        'Caja Rural':'https://www.cajaruralgranada.es/es/particulares/cita-previa'
    }

    const route = useRoute();
    const { entidad } = route.params;


    useEffect(() => {
        const url = bancosURL[entidad];
        if (url) {
          Linking.openURL(url);
        } else {
          alert("No hay cita")
        }
      }, [entidades]);
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Volver a la aplicación</Text>
    </TouchableOpacity>
      
      
      ;
    
      return null; // No necesitas renderizar nada en este componente

     
    };

export default PaginasBancos;
