import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const CitaMedica = () => {
  const navigation = useNavigation();

  const comunidades = ["Andalucía","Aragón","Asturias","Cantabria","Castilla y León",
    "Castilla-La Mancha","Cataluña","Ceuta","Extremadura","Galicia","Islas Baleares","Islas Canarias",
    "La Rioja","Madrid","Melilla","Murcia","Navarra","País Vasco","Valencia",];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
       <Image source={require('../../assets/Citamedica.png')} style={styles.image} />
      <Text style={styles.banner}>Selecciona tu comunidad</Text>
      <Anuncio/>
      </View>
      <ScrollView >
        {comunidades.map((item, index) => (
          <TouchableOpacity
          key={index}
          style={styles.comunidadItem}
          onPress={() => {
            if (item === "Galicia") {
              navigation.navigate("AvisoCitaMedica");
            } else {
              navigation.navigate("PaginasMedicas", { comunidad: item });
            }
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

export default CitaMedica;