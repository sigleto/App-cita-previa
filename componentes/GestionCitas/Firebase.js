import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

// Importaciones para Notificaciones
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// --- Inicialización de Firebase ---
let app;
let auth;
let db;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  db = getFirestore(app);
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// --- Funciones de Firestore ---

/**
 * Guarda un evento en la colección 'eventos'.
 * Convierte el objeto Date de JS a un Timestamp de Firebase para evitar errores.
 */
export const agregarEventoFirestore = async (evento) => {
  try {
    // Es crítico transformar la fecha antes de enviarla
    const dataParaGuardar = {
      ...evento,
      dateTime: Timestamp.fromDate(new Date(evento.dateTime)),
      createdAt: Timestamp.now(), // Marca de tiempo de cuándo se creó el registro
    };

    const docRef = await addDoc(collection(db, "eventos"), dataParaGuardar);

    console.log("Evento agregado con ID: ", docRef.id);
    Alert.alert(
      "¡Perfecto!",
      "Te mandaremos un recordatorio antes de la cita. Asegúrate de que la aplicación tiene permisos de notificación."
    );
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar el evento a Firestore: ", error);
    Alert.alert("Error", "No se pudo guardar la cita: " + error.message);
    throw error;
  }
};

// --- Lógica de Notificaciones Push ---

export const getPushNotificationToken = async () => {
  if (!Device.isDevice) {
    console.log("Debe usar un dispositivo físico para notificaciones push");
    return null;
  }

  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permiso de notificaciones rechazado");
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  } catch (error) {
    console.error("Error al obtener el token de notificaciones:", error);
    return null;
  }
};

export { app, auth, db };
