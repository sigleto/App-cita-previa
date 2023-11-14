import React from "react";
import { View, Text, Linking, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const centerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
export const AvisoGestion = () => {

    const navigation=useNavigation()
    return (
      <View style={[styles.container, centerStyle]}>
        <View style={styles.aviso}>
          <Text style={styles.texto}>
          ¡ATENCIÓN!: Aquí podras guardar todas tus citas una vez concertadas y consultarlas cuando quieras. Además te ofrecemos la opción de recibir un aviso a tu móvil unos días antes del vencimiento de la cita
          </Text>
          <Text
            style={styles.avisoLink}
            onPress={() =>
             navigation.navigate('GestionCitas')
              
            }
          >
            CONTINUAR
          </Text>
        </View>
      </View>
    );
  };

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      height: windowHeight,
    },
    aviso: {
      backgroundColor: "#eff4bd",
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
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