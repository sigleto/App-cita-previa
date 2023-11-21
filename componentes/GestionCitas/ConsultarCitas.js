import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';

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
            citasData.push(eventData);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citas concertadas</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : citas.length === 0 ? (
        <Text style={styles.texto}>Todavía no tienes citas guardadas</Text>
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.citaItem}>
              {item.dateTime && ( // Asegúrate de que la propiedad sea dateTime
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
      )}
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

});
