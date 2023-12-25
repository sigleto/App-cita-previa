import React,{useEffect} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaginasComunidades = ({comunidades}) => {
   

    const citasPreviasURL = {
    'Junta de Andalucía':'https://tuturno.juntadeandalucia.es/citaprevia/citapreviaOperacion?tenantId=998',
    'Gobierno de Aragón':'https://citaprevia.aragon.es/provincias',
    'Gobierno del Principado de Asturias':'https://www62.asturias.es/solicitud_citaprevia/#',
    'Govern de les Illes Balears':'https://ac.fundaciobit.org/citaregistro/reservar-cita;lang=es', 
    'Gobierno de Canarias':'https://sede.gobiernodecanarias.org/sede/citaprevia',
    'Gobierno de Cantabria':'https://aplicacionesweb.cantabria.es/citaprevia/public/datos-solicitar',
    'Junta de Castilla y León':'https://cita-eyh-jcyl.es/',
    'Juanta de Comunidades de Castilla-La Mancha':'https://ventaenlinea.castillalamancha.es/ventaenlinea/apojccm/bs/4',
    'Generalitat de Catalunya':'https://ovt.gencat.cat/gsitfc/AppJava/citpre/citpre.do?set-locale=es_ES&reqCodeChangeLanguage=officeSearch',
    'Junta de Extremadura':'https://portaltributario.juntaex.es/portaltributarioutils/pantallas/cita_previa/identificacion.jsf',
    'Xunta de Galicia':'https://012.xunta.gal/servizos-destacados/cita-previa#DS001',
    'Comunidad de Madrid':'https://012.xunta.gal/servizos-destacados/cita-previa#DS001',
    'CA de la región de Murcia':'https://gescolas.carm.es/gescolas/faces/citaprevia/cita/crearcita-datos.xhtml?idcentrogestor=3',
    'Gobierno de Navarra':'https://www.navarra.es/es/tramites/on/-/line/Cita-previa-para-registros-y-oficinas-de-Atencion-Ciudadana',
    'Gobierno vasco':'https://www.euskadi.eus/web01-ejqmatic/es/zuzeneanwebbooking/#/?lang=es_es',
    'Gobierno de La Rioja':'https://citaprevia.larioja.org/es/tramites/Tributos/Planificaci%C3%B3n%20Tributos',
    'Generalitat Valenciana':'https://www.gva.es/es/web/atencio_ciutadania/inicio/atencion_ciudadano/citas_previas',

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

export default PaginasComunidades;
