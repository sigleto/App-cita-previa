import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const PoliticaPrivacidad = () => {
  const abrirDocumento = () => {
    Linking.openURL(
      "https://docs.google.com/document/d/1y7S2w-nDnGqkgO7z5tuL4C8wckRTSXjOl6wgZmaUNcM/edit?tab=t.0#heading=h.bdzh75zqwhs"
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Text style={styles.titulo}>Política de privacidad</Text>

        <Text style={styles.parrafo}>
          Para consultar nuestra política de privacidad completa, por favor
          accede al siguiente enlace. Allí encontrarás toda la información sobre
          la recopilación, uso y protección de datos personales.
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={abrirDocumento}>
          <Text style={styles.linkText}>Abrir política de privacidad</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
    color: "#007BFF",
    textAlign: "center",
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  linkButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PoliticaPrivacidad;
