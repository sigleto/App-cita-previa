import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const AvisoGestion = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, styles.centeredContainer]}>
      <View style={styles.avisoContainer}>
      <Image source={require('../../assets/agendareloj.jpg')} style={styles.image} />
        <Text style={styles.avisoTexto}>
          ¡Bienvenido/a a tu agenda personal ! Aquí podrás guardar todas tus citas o eventos y consultarlas cuando quieras. Además, te enviaremos un recordatorio de tu cita en el momento que tú eligas.
        </Text>
        <TouchableOpacity
          style={styles.continuarButton}
          onPress={() => navigation.navigate("GestionCitas")}
        >
          <Text style={styles.continuarButtonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#d5ff8c", // Cambié el color de fondo a uno más claro
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avisoContainer: {
    backgroundColor: "white", // Cambié el color de fondo del aviso
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
    width: windowWidth * 0.9, // Ajusté el ancho del aviso
  },
  avisoTexto: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "justify",
    color: "#0e0f0f", // Cambié el color del texto a uno más oscuro
    fontWeight:'bold',
  },
  
continuarButton: {
  backgroundColor: "#007BFF",
  paddingVertical: 8, // Ajusta el padding vertical para hacerlo más corto
  paddingHorizontal: 16, // Ajusta el padding horizontal para ajustar el tamaño del botón
  borderRadius: 8,
  alignItems: "center",
  marginTop: 20, // Espacio entre el texto y el botón
  marginLeft:80,
  maxWidth: 170, // Ancho máximo del botón (ajústalo según tus necesidades)
},
continuarButtonText: {
  color: "#fff",
  fontSize: 16, // Ajusta el tamaño del texto si es necesario
  fontWeight: "bold",

},
  image: {
    width: 100, // Tamaño ajustado para que parezca un ícono
    height: 100, // Tamaño ajustado para que parezca un ícono
    resizeMode: "contain", // Mantiene la proporción de la imagen
    marginBottom: 10, // Espacio entre la imagen y el texto
    marginLeft:110,
  },
});


