import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";


const DescargoResponsabilidad = () => {
  const navegacion = useNavigation();

  const salto = () => { navegacion.navigate("Organismos") }

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Aviso de Descargo de Responsabilidad:</Text>
        <Text style={styles.parrafo}>
          {"Esta aplicación tiene como objetivo facilitar la gestión de citas previas con diversas entidades, tanto públicas como privadas. Queremos destacar que no somos una entidad pública ni estamos afiliados a ninguna. Somos un servicio independiente que recopila información de fuentes públicas para proporcionar una interfaz conveniente para agendar citas.\n\n" +
          "La información que ofrecemos se basa en la disponibilidad y políticas de las entidades correspondientes. No asumimos ninguna responsabilidad por cambios en los horarios, políticas o cualquier otro aspecto de las entidades para las cuales se realizan citas.\n\n" +
          "Por favor, tenga en cuenta que esta aplicación no representa ni pretende representar a ninguna entidad pública. La información proporcionada debe ser verificada directamente con las entidades correspondientes para garantizar su autenticidad.\n\n" +
          "Gracias por utilizar nuestra aplicación."}
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
    marginBottom: 16,
    marginTop:40,
    color: '#007BFF', // Color del título
  },
  parrafo: {
    fontSize: 16,
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
export default DescargoResponsabilidad;
