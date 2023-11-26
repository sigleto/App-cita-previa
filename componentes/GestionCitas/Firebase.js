import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import * as Notifications from 'expo-notifications';
import {API_KEY,AUTH_DOMAIN,PROJECT_ID,
  STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID,MEASUREMENT_ID} from '@env'


export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para agregar un evento a Firestore
export const agregarEventoFirestore = async (evento) => {
  try {
    const docRef = await addDoc(collection(db, "eventos"), evento);
    console.log("Evento agregado con ID: ", docRef.id);
    alert ('Perfecto!!... Te mandaremos un recordatorio  antes de la cita')
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

