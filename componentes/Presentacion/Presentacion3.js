import React from "react";
import { View, Text, StyleSheet, Linking,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";


const Presentacion3 = () => {

  const navegacion = useNavigation();
  const pasa = () => { navegacion.navigate("Organismos") }
  

  return (
    <View style={styles.container}>
       <SharedElement id="elementId">
      <Text style={styles.parrafo}>
      En ningún caso es necesario autenticarse, basta con tus datos básicos para resevar la práctica totalidad de las citas.
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
   
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  parrafo: {
    fontSize: 30,
    textAlign: 'justify',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    paddingHorizontal: 30,
    borderRadius: 8,

  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },arroba:{
    fontSize:20,
    color:'#f41171'
  }
});

export default Presentacion3;
