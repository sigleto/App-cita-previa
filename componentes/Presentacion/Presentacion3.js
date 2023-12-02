import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const Presentacion3 = () => {
  const navegacion = useNavigation();
  const pasa = () => { navegacion.navigate("Organismos") }

  return (
    <View style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.parrafo}>
          {"Te ofrecemos también la posibilidad de guardar tus citas y consultarlas cuando quieras. Además, te recordaremos tus eventos mmediante una notificación a tu dispositivo con la antelación que tu eligas."}
        </Text>
      </SharedElement>
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
    backgroundColor: '#d0f3ed',
  },
  parrafo: {
    fontSize: 30,
    textAlign:'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 30, // Ajusta la altura de línea para mejorar la legibilidad
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#33FF77',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Presentacion3;
