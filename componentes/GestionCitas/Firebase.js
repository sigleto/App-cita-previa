import { collection, addDoc,getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
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

// Función para agregar el token a Firestore
export const agregarTokenFirestore = async (userId, token) => {
  try {
    // Verificar si ya existe un documento para el usuario
    const userDocRef = doc(db, 'usuarios', userId);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists()) {
      // Si el documento existe, actualiza el token
      await updateDoc(userDocRef, {
        fcmToken: token,
      });
    } else {
      // Si el documento no existe, crea uno nuevo
      await addDoc(collection(db, 'usuarios'), {
        userId: userId,
        fcmToken: token,
      });
    }

    console.log('Token agregado a Firestore:', token);
  } catch (error) {
    console.error('Error al agregar el token a Firestore:', error);
  }
};