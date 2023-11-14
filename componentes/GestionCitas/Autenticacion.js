import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig,agregarEventoFirestore } from './Firebase';
import messaging from '@react-native-firebase/messaging';

const Autentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  /*Obtener el token del dispositivo y guardarlo en Firestore al iniciar sesión
  useEffect(() => {
    const getTokenAndSave = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (auth.currentUser) {
          // Si el usuario está autenticado, guarda el token en Firestore
          agregarEventoFirestore(auth.currentUser.uid, fcmToken);
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    const unsubscribe = messaging().onTokenRefresh(getTokenAndSave);

    return () => unsubscribe();
  }, [auth.currentUser]); // Solo vuelva a ejecutarse si cambia el usuario autenticado

*/
  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('¡Enhorabuena, cuenta creada!');
      navigation.navigate("EventCalendar")
    } catch (error) {
      const errorMessage = error.code === 'auth/weak-password'
        ? 'La contraseña debe tener al menos 6 caracteres'
        : 'Error al crear la cuenta. Por favor, inténtalo de nuevo.';
      Alert.alert(errorMessage);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Autenticado:', user);
      navigation.navigate('EventCalendar');
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? 'Usuario no encontrado. Por favor, verifica tu correo electrónico.'
        : 'Error al iniciar sesión. Verifica tus credenciales.';
      Alert.alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Debes autenticarte para usar esta opción</Text>
      {!showLoginForm && !showSignupForm && (
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button1} onPress={() => setShowLoginForm(true)}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => setShowSignupForm(true)}>
            <Text style={styles.buttonText}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View>
      )}
      {(showLoginForm || showSignupForm) && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {showSignupForm && (
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          )}
          {showLoginForm && (
            <TouchableOpacity style={styles.button1} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          )}
          {showSignupForm && (
            <TouchableOpacity style={styles.button2} onPress={handleCreateAccount}>
              <Text style={styles.buttonText}>Crear una cuenta</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e0fbd6',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
    padding: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'white'
  },
  button1: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#cb9553',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20,
  },
  titulo:{
    marginBottom:30,
    fontSize:22,
    color:'#bb6702',
    textAlign:'center'
  }
});

export default Autentication;
