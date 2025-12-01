import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de menú */}
      <MaterialCommunityIcons
        name="menu"
        size={32}
        style={styles.menuIcon}
        onPress={() => navigation.toggleDrawer()}
      />

      <Image source={require("../assets/LogoJuan.png")} style={styles.logo} />

      <Text style={styles.titulo}>Bienvenido a Cita Previa</Text>

      <Text style={styles.descripcion}>
        Coordina citas con diferentes organismos de forma eficiente y gestiona
        tus eventos y notas en una agenda personalizada.
      </Text>

      <Image
        source={require("../assets/citaprevia.png")}
        style={styles.burocraciaImage}
      />

      <Text style={styles.descargo}>
        ** Esta aplicación no está afiliada ni representa a ninguna entidad
        gubernamental. **
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Organismos")}
        >
          <MaterialCommunityIcons
            name="office-building"
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>Organismos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GestionCitas")}
        >
          <MaterialCommunityIcons
            name="calendar-check"
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>Gestiona tus citas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GestionNotas")}
        >
          <MaterialCommunityIcons name="notebook" size={24} color="white" />
          <Text style={styles.buttonText}>Notas personales</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  logo: { width: 150, height: 150, marginBottom: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 10 },
  descripcion: { textAlign: "center", fontSize: 16, color: "#555", marginBottom: 20 },
  burocraciaImage: { width: "80%", height: 120, resizeMode: "contain", marginBottom: 20 },
  descargo: { textAlign: "center", fontSize: 12, fontStyle: "italic", color: "red", marginBottom: 20 },
  buttonContainer: { width: "100%", alignItems: "center" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  menuIcon: { position: "absolute", top: 50, left: 20, color: "#333" },
});





export default Home;
