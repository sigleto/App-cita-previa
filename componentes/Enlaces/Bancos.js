import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Avisos/Anuncio";
const Bancos = () => {
  const navigation = useNavigation();

  const entidades = ["Banco Santander","Banco Sabadell","BBVA","Caixabank","Unicaja",
    "Abanca","Caixa Popular","Caja Rural"];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
       <Image source={require('../../assets/Bancos.jpg')} style={styles.image} />
      <Text style={styles.banner}>Selecciona tu entidad bancaria</Text>
      <Anuncio/>
      </View>
      <ScrollView>  
        {entidades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.comunidadItem}
            onPress={() => {
              navigation.navigate("PaginasBancos",{entidad:item})
            }}
          >
            <Text style={styles.comunidadText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: "#b8e6df",
    zIndex: 1,
    elevation: 3,
  },
  banner: {
    padding: 10,
    fontSize: 25,
    color: '#9b0a9b',
  },
  comunidadItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  comunidadText: {
    fontSize: 22,
    color: '#5278ca',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop:50
  },
});

export default Bancos;