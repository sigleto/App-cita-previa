import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const CitaITV = () => {
  const navigation = useNavigation();

  const comunidades = [
    "Andalucía",
    "Aragón",
    "Asturias",
    "Cantabria",
    "Castilla y León",
    "Castilla-La Mancha",
    "Cataluña",
    "Ceuta",
    "Extremadura",
    "Galicia",
    "Islas Baleares",
    "Islas Canarias",
    "La Rioja",
    "Madrid",
    "Melilla",
    "Murcia",
    "Navarra",
    "País Vasco",
    "Valencia",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Image source={require("../../assets/ITV.jpg")} style={styles.image} />

        <Text style={styles.banner}>Selecciona tu comunidad</Text>

        {/* 🔴 DISCLAIMER OBLIGATORIO */}
        <Text style={styles.disclaimer}>
          Aplicación no oficial. No representa a ninguna estación ITV ni a
          organismos públicos. Proporciona enlaces a las páginas web oficiales o
          autorizadas para solicitar cita previa.
        </Text>

        <Anuncio />
      </View>

      <ScrollView>
        {comunidades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.comunidadItem}
            onPress={() =>
              navigation.navigate("PaginasITV", { comunidad: item })
            }
          >
            <Text style={styles.comunidadText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stickyHeader: {
    backgroundColor: "#b8e6df",
    elevation: 3,
    paddingBottom: 10,
  },
  banner: {
    padding: 10,
    fontSize: 24,
    color: "#9b0a9b",
    textAlign: "center",
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  comunidadItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  comunidadText: {
    fontSize: 20,
    color: "#5278ca",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 50,
  },
});

export default CitaITV;
