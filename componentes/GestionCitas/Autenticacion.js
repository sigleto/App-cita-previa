import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail, GoogleAuthProvider,signInWithCredential }from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, getPushNotificationToken} from './Firebase';
import GoogleLoginButton from '../BotonGoogle';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import {EXPO_PUBLIC_CLIENT_ID,EXPO_PUBLIC_ANDROID_CLIENT_ID} from '@env'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



const app=initializeApp(firebaseConfig)
const auth = getAuth(app);

const Autentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigation = useNavigation();


  
  
 //FUNCIÓN PARA AUTENTICARSE CON GOOGLE
const [error,setError]=useState();
const [userInfo,setUserInfo]=useState();


 const configureGoogleSignin=()=>{
  GoogleSignin.configure({  webClientId: EXPO_PUBLIC_CLIENT_ID, // Reemplaza con tu propio webClientId
  offlineAccess: true, // Necesario para obtener el refreshToken 
  } );
 }

useEffect(() => {
  configureGoogleSignin()
 
}, []);

 
const handleGoogleSignIn = async () => {
  
  try {
   
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setUserInfo(userInfo);
    setError(undefined); 
    console.log(userInfo.user.givenName)
    
// Guardar el usuario en Firebase al iniciar sesión con Google
if (userInfo) {
 
  console.log (userInfo)
  const { idToken, accessToken } = userInfo;
  const credential = GoogleAuthProvider.credential(idToken, accessToken);
  await signInWithCredential(auth,credential);
}

// Navega a la pantalla EventCalendar solo si el inicio de sesión con Google es exitoso
    navigation.navigate("EventCalendar1", { userEmail: userInfo.user.email })
  } catch (error) {
    console.error(error); 
    switch(error.code){
      case statusCodes.SIGN_IN_CANCELLED:
        Alert.alert("cancelado");break;
      case statusCodes.IN_PROGRESS:
        Alert.alert ('en progreso');break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Alert,alert("no disponible");break;
      default: 
      Alert.alert ("Error",error.message);
      setError(error);

    }
  }
};

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
      navigation.navigate("EventCalendar1");
        
     
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? 'Usuario no encontrado. Por favor, verifica tu correo electrónico.'
        : 'Error al iniciar sesión. Verifica tus credenciales.';
      Alert.alert(errorMessage);
    }
  };
// FUNCIÓN PARA RECUPERAR LA CONTRASEÑA
const handleForgotPassword = async () => {
  try {
    // Validar si se ha proporcionado una dirección de correo electrónico
    if (!email) {
      Alert.alert('Error', 'Por favor, introduce tu dirección de correo electrónico.');
      return;
    }

    await sendPasswordResetEmail(auth, email);
    Alert.alert('Correo de restablecimiento enviado', 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    // Manejar otros errores aquí si es necesario
    Alert.alert('Error', 'Hubo un error al enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.');
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
    <Image source={require('../../assets/citaprevia.png')} style={styles.image} />
        <Text style={styles.avisoTexto}>
          ¡Bienvenid@ de nuevo!
        </Text>
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
        {showLoginForm && (
          <TouchableOpacity  onPress={handleForgotPassword}>
            <Text style={styles.button3}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        )}
        
    <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      
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
    backgroundColor:'#d5ff8c',
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
    marginTop: 20,
    padding: 10,
    backgroundColor: '#cb9553',
    borderRadius: 5,
    alignItems: 'center',
  },
  button3: {
    fontWeight:'bold',
    padding: 10,
    marginVertical: 10,
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
    color:'#510233',
    textAlign:'center'
  },
  hidden: {
    display: 'none',
  },
  image: {
    width: 200, // Tamaño ajustado para que parezca un ícono
    height: 200, // Tamaño ajustado para que parezca un ícono
     // Mantiene la proporción de la imagen
    marginBottom: 40, // Espacio entre la imagen y el texto
    
  },
  avisoTexto: {
    fontSize: 25,
    marginBottom: 15,
    textAlign: "justify",
    color: "#0e0f0f", // Cambié el color del texto a uno más oscuro
    fontWeight:'bold',
  },
 
  
  
});

export default Autentication;
