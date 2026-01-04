import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const DNI = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../../assets/DNI.png")} style={styles.image} />

      <Text style={styles.titulo}>Acceso a cita previa – DNI y Pasaporte</Text>

      <Anuncio />

      <View style={styles.serviciosList}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("AvisoDNI")}
        >
          <Text style={styles.itemText}>
            Acceder a información y enlace oficial
          </Text>
        </TouchableOpacity>

        {/* DISCLAIMER OBLIGATORIO */}
        <Text style={styles.disclaimer}>
          Aplicación no oficial. La solicitud y gestión de la cita se realiza
          únicamente en el portal oficial de la Policía Nacional.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
    marginTop: 60,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  serviciosList: {
    marginLeft: 16,
    marginRight: 16,
  },
  item: {
    marginTop: 50,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    marginTop: 6,
  },
});

export default DNI;
