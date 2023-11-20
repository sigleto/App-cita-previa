import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, getPushNotificationToken,enviarNotificacionPrueba } from './Firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import GoogleLoginButton from '../BotonGoogle';

WebBrowser.maybeCompleteAuthSession();

const Autentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

/*FUNCIÓN PARA AUTENTICARSE CON GOOGLE



  const[accessToken,setAccessToken]=useState(null);
  const[user,setUser]=useState(null);
  const[request,response,promptAsync]=Google.useIdTokenAuthRequest({
    clientId:"909578452911-3hddvc5tj8vdd43qcm1sjc86d06c8v8i.apps.googleusercontent.com",
    androidClientId:"909578452911-8fn5ic8k5pia6e005gcdqk6a39bp3uvf.apps.googleusercontent.com"
  })
 useEffect(()=>{
  if (response?.type==="success"){
    setAccessToken(response.authentication.accessToken);
    accessToken && fetchUserInfo();
    console.log("User:", user);
    if (user) {
      // Redirige al usuario a la página "EventCalendar" al autenticarse con Google
      navigation.navigate('EventCalendar');}
  }
 },[response,accessToken,user])

 async function fetchUserInfo(){
  let response= await fetch("https://googleapis.com/userinfo/v2/me",{
    headers:{ Authorization:`Bearer ${accessToken}` }
  })
  const userInfo=await response.json()
  setUser(userInfo)

 }
 */

  //FUNCIÓN PARA AUTENTICARSE CON EMAIL Y PASSWORD
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Autenticado:', user.email);
      const obtenerTokens = async () => {
        try {
          const tokens = await getPushNotificationToken();
          console.log('Tokens obtenidos:', tokens);
          // Aquí puedes realizar otras acciones con los tokens según tus necesidades
        } catch (error) {
          console.error('Error al obtener los tokens:', error);
        }
      };
      
      // Llama a la función para obtener los tokens cuando sea necesario
      obtenerTokens();
      navigation.navigate("EventCalendar");

   // FUNCIÓN PARA LA NOTIFICACIÓN DE PRUEBA
  await enviarNotificacionPrueba();
  
      
      
      navigation.navigate('EventCalendar');
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? 'Usuario no encontrado. Por favor, verifica tu correo electrónico.'
        : 'Error al iniciar sesión. Verifica tus credenciales.';
      Alert.alert(errorMessage);
    }
  };

//FUNCIÓN PARA CREAR UNA CUENTA
const handleCreateAccount = async () => {
  if (password !== confirmPassword) {
    Alert.alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    Alert.alert('¡Enhorabuena, cuenta creada!');
    const obtenerTokens = async () => {
      try {
        const tokens = await getPushNotificationToken();
        console.log('Tokens obtenidos:', tokens);
        // Aquí puedes realizar otras acciones con los tokens según tus necesidades
      } catch (error) {
        console.error('Error al obtener los tokens:', error);
      }
    };
    
    // Llama a la función para obtener los tokens cuando sea necesario
    obtenerTokens();
 

    navigation.navigate("EventCalendar");
  } catch (error) {
    const errorMessage = error.code === 'auth/weak-password'
      ? 'La contraseña debe tener al menos 6 caracteres'
      : 'Error al crear la cuenta. Por favor, inténtalo de nuevo.';
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
        {/* Agrega el botón de inicio de sesión con Google */}
        <GoogleLoginButton onPress={''} />
        
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
    backgroundColor: '#4285F4',
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
    fontSize:18,
  },
  titulo:{
    marginBottom:30,
    fontSize:22,
    color:'#bb6702',
    textAlign:'center'
  },
  
});

export default Autentication;
