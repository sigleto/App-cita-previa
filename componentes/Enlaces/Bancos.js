import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaginasBancos from "../paginas/PaginasBancos";
const Bancos = () => {
  const navigation = useNavigation();

  const entidades = ["Banco Santander","Banco Sabadell","BBVA","Caixabank","Unicaja",
    "Abanca","Caixa Popular","Caja Rural"];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.banner}>Selecciona tu entidad bancaria</Text>
      <View>
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
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    padding: 10,
    backgroundColor: "#b8e6df",
    fontSize:25,
    marginTop:80,
    marginBottom:30,
    color: '#9b0a9b'
   
  },
  comunidadesBanner: {
    backgroundColor: "#fff",
    elevation: 3,
    margin: 10,
    padding: 10,
    marginTop:50,
    fontSize:30,
  },
  comunidadesBannerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  comunidadItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  selectedComunidadItem: {
    backgroundColor: "#ffcc00", // Color de fondo cuando se selecciona
  },
  comunidadText: {
    fontSize: 22,
    color:'#5278ca'
  },
  
});

export default Bancos;
