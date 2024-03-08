import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const ClasesPasivas = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/clasesPasivas.jpg')} style={styles.image} />
      <Text style={styles.titulo}>Cita previa para trámites diversos en Clases Pasivas</Text>
      <Anuncio/>  
      <View style={styles.serviciosList}>
      <TouchableOpacity style={styles.item} onPress={() => openLink('https://ssweb.seap.minhap.es/icpplus/citar?org=DGCP')}>
          <Text style={styles.itemText}>CITA PREVIA</Text>
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
    textAlign:'center'
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
    textAlign:'center'
  },arroba:{
    fontSize:20,
    color:'#f41171'
  }
});

export default ClasesPasivas;
