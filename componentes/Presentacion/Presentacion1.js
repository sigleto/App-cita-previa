import React from "react";
import { View, Text, StyleSheet, Linking,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";


const Presentacion1 = () => {

  const navegacion = useNavigation();
  const pasa = () => { navegacion.navigate("Presentacion2") }
  const salto = () => { navegacion.navigate("Organismos") }

  return (
    <View style={styles.container}>
       <SharedElement id="elementId">
      <Text style={styles.parrafo}>
      "¡Bienvenidos a 'Cita Previa'! La aplicación que simplifica tu vida al agendar citas previas con diversos organismos de manera rápida y eficiente.
       
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
    backgroundColor:'#d0f3ed',
    justifyContent: "center",
    alignItems: "center",
    
    
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  parrafo: {
    fontSize: 37,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  skipButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#33FF77',
    paddingVertical: 10,
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
