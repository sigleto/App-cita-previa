import React,{useEffect,useState} from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";


const Ayuntamientos = () => {
  const navigation = useNavigation();

  const municipios = ['A Coruña','Albacete','Alcalá de Henares','Algeciras','Alicante','Almería','Ávila','Badalona','Badajoz', 'Barcelona','Bilbao','Burgos','Córdoba',
    'Cartagena','Castellón de la Plana','Ciudad Real','Córdoba','Cuenca','Dos Hermanas','El Puerto de Santa María','Elche','Fuenlabrada',
    'Getafe','Gijón','Girona','Granada','Guadalajara','Hospitalet de Llobregat','Huelva','Huesca','Jaén','Jerez de la Frontera','Las Palmas de Gran Canaria',
    'Lleida','Logroño','Lugo','Málaga','Marbella','Madrid','Murcia','Móstoles','Oviedo','Palencia',
    'Palma de Mallorca','Pamplona','Parla','Pontevedra','Reus','Sabadell','Salamanca','San Sebastian','Santa Coloma de Gramenet',
    'Santa Cruz de Tenerife','Sevilla','Soria','Tarragona','Terrassa','Telde','Teruel','Toledo','Torrejón de Ardoz',
    'Torrevieja','Valencia','Valladolid','Vigo','Vitoria-Gasteiz','Zamora','Zaragoza'];

 
  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
       <Image source={require('../../assets/municipios.png')} style={styles.image} />
      <Text style={styles.banner}>Selecciona tu municipio</Text>
      <Anuncio/>
      </View>
      <ScrollView >
        {municipios.map((item, index) => (
          <TouchableOpacity
          key={index}
          style={styles.comunidadItem}
          onPress={() => {
                navigation.navigate("PaginasAyuntamientos", { municipio: item });
             }}
        >
          <Text style={[
              styles.comunidadText,
              item === "Galicia" ? { color: "red" } : null
            ]}>
              {item}
            </Text>
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: "#b8e6df",
    zIndex: 1,
    elevation: 3,
  },
  banner: {
    padding: 10,
    fontSize: 25,
    color: '#9b0a9b',
  },
  comunidadItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  comunidadText: {
    fontSize: 22,
    color: '#5278ca',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop:50
  },
    comunidadItemGalicia: {
    color: "red", // Cambia el fondo a rojo para "Galicia"
  },
});

export default Ayuntamientos;