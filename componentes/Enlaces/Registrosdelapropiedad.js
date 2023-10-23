import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegistrosPropiedad = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/registroPropiedad.jpg')} style={styles.image} />
      

      <View style={styles.serviciosList}>
      
        <TouchableOpacity style={styles.item} onPress={() => openLink('https://www.registradores.org/informacion-al-ciudadano/cita-previa/cita-previa-registros')}>
          <Text style={styles.itemText}>CITA PREVIA REGISTROS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => openLink('https://www.registradores.org/informacion-al-ciudadano/cita-previa/cita-previa-oficinas-liquidadoras')}>
          <Text style={styles.itemText}>CITA PREVIA OFICINAS LIQUIDADORAS</Text>
        </TouchableOpacity>
       
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
    marginTop:60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  serviciosList: {
    marginLeft: 16,
  },
  item: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginTop:50,
    },
  itemText: {
    fontSize: 22,
    color: "#007AFF",
    fontWeight: "bold",
    textAlign:'center',
  },arroba:{
    fontSize:20,
    color:'#f41171'
  }
});

export default RegistrosPropiedad;