import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const AvisoGestion = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, styles.centeredContainer]}>
      <View style={styles.avisoContainer}>
        <Text style={styles.avisoTexto}>
          Aquí podrás guardar todas tus citas o eventos y consultarlas cuando quieras. Además, te enviaremos un recordatorio de tu cita en el momento que tu eligas.
        </Text>
        <TouchableOpacity
          style={styles.continuarButton}
          onPress={() => navigation.navigate("GestionCitas")}
        >
          <Text style={styles.continuarButtonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#f8f9fa", // Cambié el color de fondo a uno más claro
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avisoContainer: {
    backgroundColor: "#e2e3e5", // Cambié el color de fondo del aviso
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
    width: windowWidth * 0.9, // Ajusté el ancho del aviso
  },
  avisoTexto: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "justify",
    color: "#0e0f0f", // Cambié el color del texto a uno más oscuro
  },
  continuarButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  continuarButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


