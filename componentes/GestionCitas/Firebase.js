import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import * as Notifications from 'expo-notifications';


export const firebaseConfig = {
  apiKey: "AIzaSyCa8Kfj6xhxzh7zp-BOoPJJiYLezvAz9Gs",
  authDomain: "eventos-de-citas-25052.firebaseapp.com",
  projectId: "eventos-de-citas-25052",
  storageBucket: "eventos-de-citas-25052.appspot.com",
  messagingSenderId: "909578452911",
  appId: "1:909578452911:web:eee074998652d53249b95a",
  measurementId: "G-241833JQ5F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para agregar un evento a Firestore
export const agregarEventoFirestore = async (evento) => {
  try {
    const docRef = await addDoc(collection(db, "eventos"), evento);
    console.log("Evento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar el evento: ", e);
  }
};



// Función para obtener el token de Expo Push y FCM
export const getPushNotificationToken = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('No se otorgó el permiso para recibir notificaciones');
      return;
    }

    const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
    const fcmToken = (await Notifications.getDevicePushTokenAsync()).data;

    console.log('Expo Push Token:', expoPushToken);
    console.log('FCM Token:', fcmToken);

    // Puedes guardar ambos tokens en tu servidor o utilizarlos según tus necesidades
    return { expoPushToken, fcmToken };
  } catch (error) {
    console.error('Error al obtener los tokencitos:', error);
    throw error; // Agregado para propagar el error
  }
};

