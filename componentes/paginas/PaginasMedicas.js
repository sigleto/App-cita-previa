import React,{useEffect} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaginasMedicas = ({comunidades}) => {
   

    const citasPreviasURL = {
        'Andalucía': 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/pages/portada.jsf',
        'Aragón': 'https://www.saludinforma.es/portalsi/web/salud/tramites-gestiones/cita-previa',
        'Asturias': 'https://www62.asturias.es/solicitud_citaprevia/#/solicitud',
        'Cantabria': 'https://citaprevia.scsalud.es/citaWebAPC/accesoLogin.html',
        'Castilla y León': 'https://citaweb.saludcastillayleon.es/CitaPreviaWeb/#/start',
        'Castilla-La Mancha': 'https://sanidad.castillalamancha.es/ciudadanos/cita-previa',
        "Cataluña": 'https://catsalut.gencat.cat/ca/coneix-catsalut/acces-sistema-salut/com-accedeix/programacio-visites/index.html',
        "Extremadura": 'https://saludextremadura.ses.es/csonline/login/login.xhtml?accion=backToCitaPrevia',
        
        "Islas Baleares": 'https://porpac.ibsalut.es/services/Appointment.action',
        "Islas Canarias": 'https://www3.gobiernodecanarias.org/citasalud/#/',
        "La Rioja": 'https://cita-previa.riojasalud.es/',
        "Madrid": 'https://www.comunidad.madrid/servicios/salud/cita-sanitaria',
        "Murcia": 'https://sede.carm.es/sms/citainternet/login.xhtml',
        "Navarra": 'https://www.navarra.es/es/tramites/on/-/line/Cita-previa-en-el-centro-de-salud',
        "País Vasco": 'https://zitaberria.osakidetza.eus/o22PlamWar/iniciologin.do?idioma=cas',
        "Valencia": 'https://www.tramita.gva.es/ctt-att-atr/asistente/asistente.html#asistente/IS',
        "Ceuta": 'https://citaweb-ingesa.sanidad.gob.es/IngesaCitaWeb/citaprevia/inicio',
        "Melilla": 'https://citaweb-ingesa.sanidad.gob.es/IngesaCitaWeb/citaprevia/inicio'
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

export default PaginasMedicas;
