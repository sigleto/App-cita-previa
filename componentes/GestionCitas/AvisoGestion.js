import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext"; // Importa el contexto

export const AvisoGestion = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useContext(AuthContext); // Obtén el estado de autenticación

  const handleContinue = () => {
    if (isAuthenticated) {
      navigation.navigate("EventCalendar1"); // Redirige directamente si está autenticado
    } else {
      navigation.navigate("GestionCitas"); // Si no está autenticado, va a la pantalla de autenticación
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/agendareloj.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>
        ¡Bienvenido/a a tu agenda personal! Aquí podrás guardar todas tus citas
        o eventos.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 100, height: 100 },
  text: { fontSize: 18, textAlign: "center", marginVertical: 20 },
  button: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
