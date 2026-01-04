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

const GuardiaCivil = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/guardiaCivil.jpg")}
        style={styles.image}
      />

      <Text style={styles.titulo}>Servicios de la Guardia Civil</Text>

      <Anuncio />

      <View style={styles.serviciosList}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            openLink("https://ssweb.seap.minhap.es/icpplus/citar?org=GCDEN")
          }
        >
          <Text style={styles.itemText}>Solicita o gestiona tu cita</Text>
        </TouchableOpacity>

        {/* DISCLAIMER OBLIGATORIO */}
        <Text style={styles.disclaimer}>
          Aplicación no oficial. Acceso mediante enlace a la sede electrónica
          oficial de la Guardia Civil.
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
    height: 300,
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
    marginTop: 70,
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

export default GuardiaCivil;
