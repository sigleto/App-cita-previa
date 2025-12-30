import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";

const Presentacion3 = () => {
  const navegacion = useNavigation();
  const pasa = () => {
    navegacion.navigate("Inicio");
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Text style={styles.parrafo}>
          Te ofrecemos la posibilidad de guardar tus citas y consultarlas cuando
          quieras. Además, te recordaremos tus eventos mediante una notificación
          en tu dispositivo con la antelación que elijas.
        </Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={pasa}>
          <Text style={styles.buttonText}>COMENZAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parrafo: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 26,
    color: "#333",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Presentacion3;
