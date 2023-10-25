import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Home = () => {
  const politica = (url) => {
    Linking.openURL(url);
  };

  const navigation=useNavigation()

  const openMenu = () => {
    navigation.openDrawer(); // Step 3
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name="menu"
        size={30}
        style={styles.menuIcon}
        onPress={openMenu} // Step 2
      />
      <Image source={require('../assets/LogoJuan.png')} style={styles.logo} />
      <Image source={require('../assets/citaprevia.png')} style={styles.burocraciaImage} />
      <Text style={styles.titulo}>Bienvenido a Cita Previa</Text>
      <Text style={styles.descripcion}>
        Simplifica tu vida al concertar citas previas
        con distintos organismos de manera rápida y eficiente.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Organismos")}>
            <Text style={styles.organismos}>ACCEDE A LOS DISTINTOS ORGANISMOS</Text>
        </TouchableOpacity>
      <View style={styles.privacidadContainer}>
        
        <TouchableOpacity
          onPress={() =>
            politica(
              "https://docs.google.com/document/d/1y7S2w-nDnGqkgO7z5tuL4C8wckRTSXjOl6wgZmaUNcM/edit"
            )
          }
        >
          <Text style={styles.privacidad}>Política de privacidad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: '70%',
    height: '22%',
    marginTop:60,
  },
  burocraciaImage: {
    width: '70%',
    height: '22%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  descripcion: {
    textAlign: 'center',
    marginTop: 20,
    fontSize:20,
    color:'#063931'
  },
  botonComenzar: {
    backgroundColor: 'blue', // Color de fondo del botón
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  botonTexto: {
    color: 'white', // Color del texto del botón
    textAlign: 'center',
    fontWeight: 'bold',
  }, privacidadContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
  },
  organismos:{
    marginTop:20,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    backgroundColor: "#8baaf7",
    fontWeight:'bold'
  } , menuIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize:40,
    zIndex: 1,
  },
 
});

export default Home;