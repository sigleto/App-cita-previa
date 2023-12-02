import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import CryptoJS from 'react-native-crypto-js';
import {CLAVE_KRYPTO} from '@env'


export default function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

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
            citasData.push({ ...eventData, text: decryptedText });
          }
        });

        setCitas(citasData);
        setLoading(false);
      } catch (error) {
        console.error('Error al consultar citas: ', error);
        setLoading(false);
      }
    };

    consultarCitas();
  }, [userId]);


  // Verificar si las citas están cargando
  if (loading) {
    return <Text>Cargando...</Text>;
  }
  console.log(citas.length)
  // Verificar si las citas están definidas y tienen longitud
  if (!citas || citas.length === 0) {
    return <Text style={styles.texto2}>Todavía no tienes citas guardadas</Text>;
  }

  // Renderizar la lista de citas
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citas concertadas</Text>
      <FlatList
        data={citas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.citaItem}>
            {item.dateTime && (
              <>
                <Text style={styles.texto}>
                  Fecha: {format(item.dateTime.toDate(), "dd 'de' LLLL 'de' yyyy", { locale: es })}
                </Text>
                <Text style={styles.texto}>Evento: {item.text}</Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f7f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  citaItem: {
    backgroundColor: '#fff',
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
    marginTop:'60%',
    textAlign:'center',
    
    fontSize: 20,
    color: 'blue', // Agrega este estilo para el color del texto
  },

});
