import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const DescargoResponsabilidad = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.navigate("Inicio");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Esto reemplaza al SharedElement */}
      <Animated.View
        entering={ZoomIn.duration(300)}
        exiting={ZoomOut.duration(200)}
      >
        <Text style={styles.titulo}>Aviso de Descargo de Responsabilidad:</Text>
      </Animated.View>

      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={styles.parrafo}>
          {"Esta aplicación tiene como objetivo facilitar la gestión de citas previas con diversas entidades, tanto públicas como privadas. Queremos destacar que no somos una entidad pública ni estamos afiliados a ninguna. Somos un servicio independiente que recopila información de fuentes públicas para proporcionar una interfaz conveniente para agendar citas.\n\n" +
            "La información que ofrecemos se basa en la disponibilidad y políticas de las entidades correspondientes. No asumimos ninguna responsabilidad por cambios en los horarios, políticas o cualquier otro aspecto de las entidades para las cuales se realizan citas.\n\n" +
            "Por favor, tenga en cuenta que esta aplicación no representa ni pretende representar a ninguna entidad pública. La información proporcionada debe ser verificada directamente con las entidades correspondientes para garantizar su autenticidad.\n\n" +
            "Gracias por utilizar nuestra aplicación."}
        </Text>
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

export default DescargoResponsabilidad;
