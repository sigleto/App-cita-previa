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

const Bancos = () => {
  const navigation = useNavigation();

  const entidades = [
    "Banco Santander",
    "Banco Sabadell",
    "BBVA",
    "Caixabank",
    "Unicaja",
    "Abanca",
    "Caixa Popular",
    "Caja Rural",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Image
          source={require("../../assets/Bancos.jpg")}
          style={styles.image}
        />

        <Text style={styles.banner}>Selecciona tu entidad bancaria</Text>

        {/* 🔴 DISCLAIMER CLARO */}
        <Text style={styles.disclaimer}>
          Esta aplicación no pertenece ni está afiliada a ninguna entidad
          bancaria. Proporciona enlaces informativos y de acceso público a los
          sitios web oficiales de cada banco.
        </Text>

        <Anuncio />
      </View>

      <ScrollView>
        {entidades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.comunidadItem}
            onPress={() =>
              navigation.navigate("PaginasBancos", { entidad: item })
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
    paddingBottom: 10,
    elevation: 3,
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
    paddingHorizontal: 10,
    marginBottom: 8,
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

export default Bancos;
