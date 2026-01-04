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

const CitaMedica = () => {
  const navigation = useNavigation();

  const comunidades = [
    "Andalucía - SAS",
    "Aragón - SALUD",
    "Asturias - SESPA",
    "Cantabria - SCS",
    "Castilla y León - SACYL",
    "Castilla-La Mancha - SESCAM",
    "Cataluña - CatSalut",
    "Ceuta",
    "Extremadura - SES",
    "Galicia - SERGAS",
    "Islas Baleares - IB-SALUT",
    "Islas Canarias - SCS",
    "La Rioja - SERIS",
    "Madrid - SERMAS",
    "Melilla",
    "Murcia - SMS",
    "Navarra - SNS-O",
    "País Vasco - Osakidetza",
    "Valencia - GVA Sanitat",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Image
          source={require("../../assets/Citamedica.png")}
          style={styles.image}
        />

        <Text style={styles.banner}>Selecciona tu comunidad</Text>

        {/* 🔴 DISCLAIMER OBLIGATORIO */}
        <Text style={styles.disclaimer}>
          Aplicación no oficial. No representa a ningún servicio de salud.
          Proporciona acceso mediante enlaces a las páginas web oficiales de los
          servicios sanitarios públicos.
        </Text>

        <Anuncio />
      </View>

      <ScrollView>
        {comunidades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.comunidadItem}
            onPress={() => {
              if (item.startsWith("Galicia")) {
                navigation.navigate("AvisoCitaMedica");
              } else {
                navigation.navigate("PaginasMedicas", { comunidad: item });
              }
            }}
          >
            <Text
              style={[
                styles.comunidadText,
                item.startsWith("Galicia") ? { color: "red" } : null,
              ]}
            >
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

export default CitaMedica;
