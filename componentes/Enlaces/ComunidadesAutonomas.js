import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Comunidades = () => {
  const navigation = useNavigation();

  const comunidades = ['Junta de Andalucía', 'Gobierno de Aragón','Gobierno del Principado de Asturias','Govern de les Illes Balears', 'Gobierno de Canarias', 'Gobierno de Cantabria', 'Junta de Castilla y León',
    'Junta de Comunidades de Castilla-La Mancha', 'Generalitat de Catalunya','Junta de Extremadura','Xunta de Galicia','Comunidad de Madrid',
    'CA de la región de Murcia','Gobierno de Navarra','Gobierno vasco','Gobierno de La Rioja','Generalitat Valenciana'];

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
       <Image source={require('../../assets/CA.png')} style={styles.image} />
      <Text style={styles.banner}>Selecciona tu Comunidad Autónoma</Text>
      </View>
      <ScrollView >
        {comunidades.map((item, index) => (
          <TouchableOpacity
          key={index}
          style={styles.comunidadItem}
          onPress={() => {
                navigation.navigate("PaginasComunidades", { comunidad: item });
             }}
        >
           <Text style={[
              styles.comunidadText,
              item === "Galicia" ? { color: "red" } : null
            ]}>
              {item}
            </Text>
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

export default Comunidades;