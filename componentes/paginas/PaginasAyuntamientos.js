import React,{useEffect} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaginasAyuntamientos = ({municipios}) => {
   

    const citasPreviasURL = {
        'Alcalá de Henares':'https://citaprevia.ayto-alcaladehenares.es/',
        'Algeciras':'https://sucitaprevia.es/citaprevia/?idCliente=7',
        'Alicante':'https://citaprevia.alicante.es/CitaPrevia/#/pedirCita?v=2.0',
        'Badalona':'http://ajuntament.badalona.cat/cita-previa/',
        'Badajoz':'https://www.aytobadajoz.es/es/ayto/especiales/especial/42505/servicios-con-cita-previa/',
        'Barcelona':'https://seuelectronica.ajuntament.barcelona.cat/oficinavirtual/es/search-result?keyword=Cita%20previa',
        'Bilbao':'https://www.bilbao.eus/cs/Satellite?c=Page&cid=1273000657572&language=es&pageid=1273000657572&pagename=Bilbaonet%2FPage%2FBIO_TemasCitaPrevia',
        'Cartagena':'https://www.cartagena.es/cita_previa.asp',
        'Castellón de la Plana':'https://www.castello.es/es/cita-previa',
        'Córdoba':'https://citaprevia.cordoba.es/',
        'Dos Hermanas':'https://cita.doshermanas.es/',
        'El Puerto de Santa María':'https://www.elpuertodesantamaria.es/oac/cita-previa/',
        'Elche':'https://www.elche.es/oficina-municipal-de-atencion-ciudadana-omac/cita-previa-omac-centro/',
        'Fuenlabrada':'https://www.ayto-fuenlabrada.es/cita-previa',
        'Getafe':'https://ssweb.seap.minhap.es/icpplus/citar?org=get',
        'Gijón':'https://www.gijon.es/es/tramites/cita-previa',
        'Girona':'https://citaprevia.girona.cat/',
        'Granada':'https://citaprevia.granada.org/',
        'Hospitalet de Llobregat':'https://citaprevia.l-h.cat/citaprevia/?codIdioma=ca',
        'Jerez de la Frontera':'https://www.sedeelectronica.jerez.es/index.php?id=118&no_cache=1&tx_tramiteskey_tramitesfrontendkey%5Btramite%5D=116&tx_tramiteskey_tramitesfrontendkey%5Baction%5D=show&tx_tramiteskey_tramitesfrontendkey%5Bcontroller%5D=Tramite',
        'A Coruña':'https://citaprevia.coruna.gal/citaprevia/?idCliente=3',
        'Las Palmas de Gran Canaria':'https://www.laspalmasgc.es/es/otras-secciones/cita-previa/',
        'Lleida':'https://citaoficines.paeria.cat/',
        'Málaga':'https://citaprevia.malaga.eu/#/solicitar',
        'Marbella':'https://citaprevia.marbella.es/?seccion=citaPrevia&subSeccion=solicitud',
        'Madrid':'https://servpub.madrid.es/GNSIS_WBCIUDADANO/tramiteDia.do',
        'Murcia':'https://www.murcia.es/web/portal/cita-previa/citapreviaurb/',
        'Móstoles':'https://www.mostoles.es/SEDE_ELECTRONICA/es/tramites-gestiones-on-line/cita-previa',
        'Oviedo':'https://www.oviedo.es/citaprevia',
        'Palma de Mallorca':'https://www.palma.cat/es/sol%C2%B7licitud-cita-pr%C3%A8via',
        'Parla':'https://citaprevia.tao.es/citaPrevia?id_cliente=DWV1036HGRTLQEXVBQHH&utm_source=PARLA&utm_medium=web&utm_campaign=citaprevia ',
        'Reus':'https://citaprevia.ubintia.com/reus/#nbb',
        'Sabadell':'https://citaprevia.sabadell.cat/QSIGE/apps/citaprevia/index.html#!/newAppoinment',
        'Santa Coloma de Gramenet':'https://www.gramenet.cat/seu-electronica/cita-previa/sollicitud-de-cita-previa/',
        'Santa Cruz de Tenerife':'https://sede.santacruzdetenerife.es/sede/cita-previa/reservar',
        'Sevilla':'https://www.sevilla.org/servicios/participacion-ciudadana/plataforma-online-para-solicitud-telematica',
        'Tarragona':'https://citaprevia.tarragona.cat/#nbb',
        'Terrasa':'https://citaprevia.terrassa.cat/citaprevia/',
        'Telde':'https://telde.sedelectronica.es/citaprevia.0',
        'Torrejón de Ardoz':'https://www.ayto-torrejon.es/cita_previa',
        'Torrevieja':'https://torrevieja.sedelectronica.es/citaprevia.0',
        'Valencia':'https://www.valencia.es/es/cas/tramites/cita-previa/-/content/portada-cita-previa-2020?uid=62073EF0AB33BD52C125857C0039F2BE',
        'Valladolid':'https://www.valladolid.es/en/cita-previa-sgi',
        'Vigo':'https://citaprevia.vigo.org/citaprevia/',
        'Vitoria-Gasteiz':'https://sedeelectronica.vitoria-gasteiz.org/j30-01s/contenidoAction.do?uid=e5b59a_12328222124__7ff9&idioma=es&lang=es&locale=es',
        'Zaragoza':'https://www.zaragoza.es/sede/portal/tramites-servicios/cita-previa',
    }

    const route = useRoute();
    const { municipio } = route.params;


    useEffect(() => {
        const url = citasPreviasURL[municipio];
        if (url) {
          Linking.openURL(url);
        } else {
          alert("no hay cita")
        }
      }, [municipios]);
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Volver a la aplicación</Text>
    </TouchableOpacity>
      
      
      ;
    
      return null; // No necesitas renderizar nada en este componente

     
    };

export default PaginasAyuntamientos;
