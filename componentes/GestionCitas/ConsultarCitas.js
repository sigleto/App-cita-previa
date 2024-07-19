import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import CryptoJS from 'react-native-crypto-js';
import { CLAVE_KRYPTO } from '@env';
import Anuncio from '../Avisos/Anuncio';
import { useNavigation } from '@react-navigation/native';

export default function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

  const navigation = useNavigation();

  const atras = () => {
    navigation.navigate("EventCalendar2");
  };

  useEffect(() => {
    const consultarCitas = async () => {
      try {
        const eventosCollection = collection(db, 'eventos');
        const eventosSnapshot = await getDocs(eventosCollection);

        const citasData = [];
        eventosSnapshot.forEach((doc) => {
          const eventData = doc.data();
          if (eventData.userId === userId) {
            // Desencriptar el texto del evento
            const decryptedText = CryptoJS.AES.decrypt(eventData.text, CLAVE_KRYPTO).toString(CryptoJS.enc.Utf8);
            // Almacenar el evento desencriptado en el array
            citasData.push({ id: doc.id, ...eventData, text: decryptedText });
          }
        });
        citasData.sort((a, b) => a.dateTime.toMillis() - b.dateTime.toMillis());
        setCitas(citasData);
        setLoading(false);
      } catch (error) {
        console.error('Error al consultar citas: ', error);
        setLoading(false);
      }
    };

    consultarCitas();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'eventos', id));
      setCitas(citas.filter(cita => cita.id !== id));
    } catch (error) {
      console.error('Error al eliminar cita: ', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Eliminar Cita",
      "¿Estás seguro de que quieres eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => handleDelete(id) }
      ]
    );
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!citas || citas.length === 0) {
    return <Text style={styles.texto2}>Todavía no tienes citas guardadas</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citas concertadas</Text>
      <Anuncio />
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.citaItem}>
            {item.dateTime && (
              <>
                <Text style={styles.texto}>
                  Fecha y Hora: {format(item.dateTime.toDate(), "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}
                </Text>
                <Text style={styles.texto}>Evento: {item.text}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
      <TouchableOpacity style={styles.atras} onPress={atras}>
        <Text style={styles.texto}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9d788',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  citaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#333', // Agrega este estilo para el color del texto
  },
  texto: {
    fontSize: 20,
    color: '#333', // Agrega este estilo para el color del texto
  },
  texto2: {
    marginTop: '60%',
    textAlign: 'center',
    fontSize: 20,
    color: 'blue', // Agrega este estilo para el color del texto
  },
  atras: {
    backgroundColor: '#6ef8e9',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginTop: 60,
    marginLeft: 20,
    fontSize: 16, // Ajusta esta propiedad para establecer el tamaño del texto
  },
  deleteButton: {
    backgroundColor: 'transparent', // Mantener el fondo transparente si lo deseas
    padding: 5,
  },
  deleteButtonText: {
    color: 'red', // Cambia el color del texto a rojo
    fontSize: 16, // Ajusta el tamaño del texto según tus preferencias
  },
});
