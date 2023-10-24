import React from "react";
import { View, Text, Linking, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AvisoCitaMedica = () => {
  const navigation=useNavigation()
  const volver = () => { navigation.goBack() }
  return (
    <View style={styles.container}>
      <View style={styles.aviso}>
        <Text style={styles.texto}>¡ATENCIÓN!: Esta comunidad autónoma no permite concertar citas por Internet desde un dispositivo móvil mediante enlaces a páginas web. Para concertar cita tendrás que descargarte la App "Sergas Móbil".</Text>
        <TouchableOpacity style={styles.avisoLink} onPress={volver}>
          <Text style={styles.avisoLink}>VOLVER</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aviso: {
    backgroundColor: "#eff4bd",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'justify',
  },
  avisoLink: {
    color: "#007BFF",
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
  }
})
export default AvisoCitaMedica