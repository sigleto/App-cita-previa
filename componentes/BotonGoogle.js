import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';

const GoogleLoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/logoGoogle.png')} // Reemplaza con la ruta de tu imagen del logo de Google
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4', // Color de fondo del botón, puedes ajustarlo según tus preferencias
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 24, // Ajusta el tamaño según sea necesario
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  buttonText: {
    color: 'white', // Color del texto, puedes ajustarlo según tus preferencias
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GoogleLoginButton;
