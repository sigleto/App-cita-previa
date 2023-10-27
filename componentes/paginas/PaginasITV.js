import React,{useEffect} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaginasITV = ({comunidades}) => {
   

    const citasPreviasURL = {
        'Andalucía': 'https://www.itvcita.com/Welcome.do',
        'Aragón': 'https://www.serviciositv.es/',
        'Asturias': 'https://www.itvasa.es/',
        'Cantabria': 'https://www.itevelesa.com/es/',
        'Castilla y León': 'https://www.itevelesa.com/es/',
        'Castilla-La Mancha': 'https://www.applusiteuve.com/es-es/',
        "Cataluña": 'https://www.applusiteuve.com/es-es/',
        "Ceuta": 'https://www.itevelesa.com/es/',
        "Extremadura": 'http://itvcitaprevia.juntaex.es/',
        "Galicia": 'https://www.sycitv.com/es/',        
        "Islas Baleares": 'https://www.applusiteuve.com/es-es/',
        "Islas Canarias": 'https://www.applusiteuve.com/es-es/',
        "La Rioja": 'https://www.itevelesa.com/es/',
        "Madrid": 'https://www.applusiteuve.com/es-es/',
        "Melilla": 'https://melilla.ivesur.es/?page_id=56',
        "Murcia": 'https://www.itevelesa.com/es/',
        "Navarra": 'https://www.itv-tuvrheinland.es/cita-previa-itv',
        "País Vasco": 'https://www.applusiteuve.com/es-es/',
        "Valencia": 'https://www.applusiteuve.com/es-es/',
        
       
    }

    const route = useRoute();
    const { comunidad } = route.params;


    useEffect(() => {
        const url = citasPreviasURL[comunidad];
        if (url) {
          Linking.openURL(url);
        } else {
          alert("no hay cita")
        }
      }, [comunidades]);
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Volver a la aplicación</Text>
    </TouchableOpacity>
      
      
      ;
    
      return null; // No necesitas renderizar nada en este componente

     
    };

export default PaginasITV;
