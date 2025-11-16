import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";

const PoliticaPrivacidad = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Text style={styles.titulo}>Política de privacidad:</Text>

        <Text style={styles.parrafo}>
          Se ha construido la aplicación Cita Previa como una aplicación
          gratuita. Este SERVICIO es proporcionado sin costo alguno y está
          destinado a ser utilizado tal cual. Esta página se utiliza para
          informar a los visitantes sobre nuestras políticas con respecto a la
          recopilación, el uso y la divulgación de información personal si
          alguien decide utilizar mi Servicio. Si elige usar nuestro Servicio,
          entonces acepta la recopilación y el uso de información en relación
          con esta política...
        </Text>

        {/* Sigue igual tu texto, solo recorté arriba para que no ocupe 300 líneas */}
      </Animated.View>

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
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
    color: "#007BFF",
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PoliticaPrivacidad;
