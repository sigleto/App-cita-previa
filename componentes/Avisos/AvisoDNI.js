import React from "react";
import { View, Text, Linking, StyleSheet, Dimensions } from "react-native";

export const AvisoDNI = () => {
  return (
    <View style={styles.container}>
      <View style={styles.aviso}>
        <Text style={styles.texto}>¡ATENCIÓN!: Ten a mano tu DNI. Te pedirán una serie de datos incluidos en el mismo.</Text>
        <Text style={styles.avisoLink} onPress={() => Linking.openURL('https://www.citapreviadnie.es/citaPreviaDni/InicioDNINIE.action')}>Ir a trámite</Text>
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
    textAlign: 'center',
  },
});
