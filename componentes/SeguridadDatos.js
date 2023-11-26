import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";


const SeguridadDatos = () => {
  const navegacion = useNavigation();

  const salto = () => { navegacion.navigate("Organismos") }

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Aviso de Seguridad de los datos</Text>
        <Text style={styles.parrafo}>
        En Cita Previa, nos comprometemos a proteger la seguridad y privacidad de tus datos.
        Implementamos medidas avanzadas de seguridad para garantizar la confidencialidad y la integridad de la información que nos confías. Utilizamos un sólido sistema de encriptación de extremo a extremo que protege tus datos tanto durante su transmisión como en su almacenamiento. Esta encriptación se realiza utilizando algoritmos robustos y está respaldada por prácticas de seguridad líderes en la industria. Además, cada vez que almacenas información crítica, como eventos o citas, empleamos técnicas de cifrado seguras. De esta manera, incluso en el caso improbable de un acceso no autorizado, los datos permanecen inaccesibles y protegidos.
        </Text>
      </SharedElement>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:50,
    color: '#007BFF', // Color del título
    textAlign:'center',
  },
  parrafo: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333', // Color del texto
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom:60,
  },
  skipButton: {
    backgroundColor: '#007BFF', // Color del botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
  },
});
export default SeguridadDatos;
