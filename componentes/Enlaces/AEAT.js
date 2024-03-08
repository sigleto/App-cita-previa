import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";

const AEAT = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/AEAT.jpg')} style={styles.image} />
      <Text style={styles.titulo}>Cita previa para la AEAT</Text>
      <Anuncio/>  
      <View style={styles.section}>
                
          <TouchableOpacity style={styles.item} onPress={() =>  Linking.openURL('https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion' )}>
            <Text style={styles.itemText}>Petición de cita previa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() =>  Linking.openURL('https://www2.agenciatributaria.gob.es/wlpl/BUCV-JDIT/AutenticaDniNieContrasteh?ref=%2Fwlpl%2FOVCT-CXEW%2FSelectorAcceso%3Fref%3D%252Fwlpl%252FTOCP-MUTE%252Finternet%252Fgestioncita%253Fnif%253D%2526nombre%253D%26aut%3DCP#top' )}>
            <Text style={styles.itemText}>Gestiona tus citas</Text>
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
    marginTop:60,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign:'center'
  },
  section: {
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  serviciosList: {
    marginLeft: 16,
  },
  item: {
    marginBottom: 16,
    marginTop:50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 22,
    color: "#007AFF",
    fontWeight: "bold",
    textAlign:'center',
  },
  arroba:{
    fontSize:20,
    color:'#f41171'
  }
});

export default AEAT;
