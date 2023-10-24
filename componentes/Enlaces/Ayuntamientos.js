import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Ayuntamientos = () => {
  const navigation = useNavigation();

  const municipios = ['Alcalá de Henares','Algeciras','Alicante','Badalona','Badajoz', 'Barcelona','Bilbao','Córdoba',
    'Cartagena','Castellón de la Plana','El Puerto de Santa María','Elche','Fuenlabrada',
    'Girona','Getafe','Granada','Hospitalet de Llobregat','Jerez de la Frontera','A Coruña',
    'Lleida','Hospitalet de Llobregat','Málaga','Marbella','Madrid','Murcia','Móstoles','Oviedo',
    'Palma de Mallorca','Las Palmas de Gran Canaria','Parla','Reus','Sabadell','Santa Coloma de Gramenet',
    'Santa Cruz de Tenerife','Sevilla','Tarragona','Terrassa','Telde','Torrejón de Ardoz',
    'Torrevieja','Valencia','Valladolid','Vigo','Vitoria-Gasteiz','Zaragoza'];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
       <Image source={require('../../assets/municipios.png')} style={styles.image} />
      <Text style={styles.banner}>Selecciona tu municipio</Text>
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