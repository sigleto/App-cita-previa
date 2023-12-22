import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const Presentacion1 = () => {
  const navegacion = useNavigation();
  const pasa = () => { navegacion.navigate("Presentacion2") }
  const salto = () => { navegacion.navigate("Home") }

  return (
    <View style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.parrafo}>
          {"¡Bienvenidos a 'Cita Previa'! La aplicación que simplifica tu vida al agendar citas previas con diversos organismos de manera rápida y eficiente."}
        </Text>
      </SharedElement>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={pasa}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
  },
  parrafo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
    color: '#333',
    fontWeight:'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  skipButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#33FF77',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Presentacion1;
