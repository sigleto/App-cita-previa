import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ITV = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
     <Image source={require('../../assets/ITV.jpg')} style={styles.image} />
      

      <View style={styles.serviciosList}>
      
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AvisosTrafico2")}>
          <Text style={styles.itemText}>Cita previa para pasar la ITV</Text>
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
    marginTop:55,
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
    textAlign:'center'
  },arroba:{
    fontSize:20,
    color:'#f41171'
  }
});

export default ITV;
