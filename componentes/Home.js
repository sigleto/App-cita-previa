import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Home = () => {
  
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.openDrawer(); // Step 3
  };

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
        Coordina citas con diferentes organismos de forma rápida y eficiente 
        y gestiona tus eventos en una agenda personalizada
      </Text>

      {/* Descargo de responsabilidad */}
      <Text style={styles.descargo}>
        ** Esta aplicación no está afiliada ni representa a ninguna entidad gubernamental. ** 
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Organismos')}>
        <Text style={styles.organismos}>ACCEDE A LOS DISTINTOS ORGANISMOS</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("AvisoGestion")}>
        <Text style={styles.organismos}>GESTIONA TUS CITAS</Text>
      </TouchableOpacity>

      <View style={styles.privacidadContainer}>
        {/* Aquí podrías agregar un enlace a la política de privacidad o cualquier otro aviso */}
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
    width: '67%',
    height: '24%',
    marginTop: 55,
  },
  burocraciaImage: {
    width: '67%',
    height: '22%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  descripcion: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 18,
    color: '#063931',
  },
  descargo: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red',  // Cambia el color para hacerlo más visible
    paddingHorizontal: 10,
  },
  organismos: {
    marginTop: 18,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    backgroundColor: "#8baaf7",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 40,
    zIndex: 1,
  },
  privacidadContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
  },
});

export default Home;
