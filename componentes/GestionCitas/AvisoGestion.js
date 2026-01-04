import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext"; // Importa el contexto
import BannerAdComponent from "../Avisos/Banner";

export const AvisoGestion = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useContext(AuthContext);

  const handleContinue = () => {
    if (isAuthenticated) {
      navigation.navigate("EventCalendar1");
    } else {
      navigation.navigate("GestionCitas");
    }
  };

  return (
    <View style={styles.container}>
      {/* CONTENIDO */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/agendareloj.jpg")}
          style={styles.image}
        />

        <Text style={styles.text}>
          ¡Bienvenido/a a tu agenda personal! Aquí podrás guardar todas tus
          citas o eventos.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>

      {/* BANNER (SEPARADO) */}
      <View style={styles.bannerContainer}>
        <BannerAdComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bannerContainer: {
    alignItems: "center",
    marginBottom: 8, // separación segura
  },
});
