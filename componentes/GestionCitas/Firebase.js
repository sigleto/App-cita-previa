import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  getAuth, 
  getReactNativePersistence, 
  browserLocalPersistence 
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as Notifications from "../../utils/expo-web-patch"; // Mantengo tu autopatch

import { 
  API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, 
  MESSAGING_SENDER_ID, APP_ID 
} from '@env';


// ------------------------------
// CONFIG
// ------------------------------

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);

// ------------------------------
// AUTH UNIVERSAL
// ------------------------------

let auth;

if (Platform.OS === "web") {
  // 🌐 WEB → SIN AsyncStorage
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  // 📱 MÓVIL → AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// ------------------------------
// FIRESTORE
// ------------------------------

const db = getFirestore(app);

// ------------------------------
// FUNCIONES FIRESTORE
// ------------------------------

export const agregarEventoFirestore = async (evento) => {
  try {
    const docRef = await addDoc(collection(db, "eventos"), evento);
    console.log("Evento agregado conn ID: ", docRef.id);
    alert('Perfecto!! Te mandaremos un recordatorio antes de la cita. Asegúrate de que la aplicación tiene permisos de notificación.');
  } catch (e) {
    console.error("Error al agregar el evento: ", e);
  }
};

// ------------------------------
// NOTIFICATIONS (Expo Push + FCM)
// ------------------------------

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

    return { expoPushToken, fcmToken };

  } catch (error) {
    console.error('Error al obtener tokens:', error);
    throw error;
  }
};

export { auth, db };
