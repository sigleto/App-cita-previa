import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const Comunidades = () => {
  const navigation = useNavigation();

  const comunidades = [
    "Junta de Andalucía",
    "Gobierno de Aragón",
    "Gobierno del Principado de Asturias",
    "Govern de les Illes Balears",
    "Gobierno de Canarias",
    "Gobierno de Cantabria",
    "Junta de Castilla y León",
    "Junta de Comunidades de Castilla-La Mancha",
    "Generalitat de Catalunya",
    "Junta de Extremadura",
    "Xunta de Galicia",
    "Comunidad de Madrid",
    "CA de la región de Murcia",
    "Gobierno de Navarra",
    "Gobierno vasco",
    "Gobierno de La Rioja",
    "Generalitat Valenciana",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Image source={require("../../assets/CA.png")} style={styles.image} />
        <Text style={styles.banner}>Selecciona tu Comunidad Autónoma</Text>

        {/* 🔴 DISCLAIMER OBLIGATORIO */}
        <Text style={styles.disclaimer}>
          Esta aplicación no es oficial ni está afiliada a ningún organismo
          gubernamental. Proporciona acceso a información pública y enlaces a
          fuentes oficiales de las Comunidades Autónomas de España.
        </Text>

        {/* 🔴 FUENTE GENERAL */}
        <TouchableOpacity
          onPress={() => Linking.openURL("https://administracion.gob.es/")}
        >
          <Text style={styles.source}>
            Fuente oficial general: https://administracion.gob.es/
          </Text>
        </TouchableOpacity>

        <Anuncio />
      </View>

      <ScrollView>
        {comunidades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.comunidadItem}
            onPress={() =>
              navigation.navigate("PaginasComunidades", { comunidad: item })
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
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  banner: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#8a0f6b",
  },
  disclaimer: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 6,
  },
  source: {
    fontSize: 13,
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  comunidadItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  comunidadText: {
    fontSize: 18,
    color: "#4a4a4a",
  },
});

export default Comunidades;
