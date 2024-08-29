import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import CryptoJS from 'react-native-crypto-js';
import { CLAVE_KRYPTO } from '@env';
import Anuncio from '../Avisos/Anuncio';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
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
            const decryptedText = CryptoJS.AES.decrypt(eventData.text, CLAVE_KRYPTO).toString(CryptoJS.enc.Utf8);
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

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A896" />
      </View>
    );
  }

  if (!citas || citas.length === 0) {
    return <Text style={styles.emptyText}>Todavía no tienes citas guardadas</Text>;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
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
                  <Ionicons name="calendar-outline" size={20} color="#333" />
                  {' '}
                  <Text style={styles.boldText}>
                    {format(item.dateTime.toDate(), "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}
                  </Text>
                </Text>
                <Text style={styles.texto}>
                  <Ionicons name="clipboard-outline" size={20} color="#333" />
                  {' '}
                  <Text style={styles.boldText}>{item.text}</Text>
                </Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
      <TouchableOpacity style={styles.atras} onPress={atras}>
        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        <Text style={styles.atrasText}>Atrás</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  citaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  texto: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: '#ffeeee',
    borderRadius: 5,
    marginTop: 10,
  },
  atras: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A896',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  atrasText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
  emptyText: {
    marginTop: '60%',
    textAlign: 'center',
    fontSize: 20,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
