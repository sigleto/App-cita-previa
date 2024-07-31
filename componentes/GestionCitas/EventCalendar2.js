import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import * as Notifications from 'expo-notifications';
import CryptoJS from 'react-native-crypto-js';
import { CLAVE_KRYPTO } from '@env';
import { firebaseConfig, agregarEventoFirestore } from './Firebase'; // Asegúrate de importar firebaseConfig correctamente

const EventCalendar2 = ({ route }) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    route.params?.selectedDate ? new Date(route.params.selectedDate) : new Date()
  );
  const [reminderTimes, setReminderTimes] = useState(route.params?.reminderTimes || []);
  const [eventText, setEventText] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userEmail = route.params?.userEmail || (user && user.email) || 'Usuario Desconocido';

  const volver = () => { navigation.navigate("Home") }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const scheduleNotification = async (dateTime, eventText) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de cita',
          body: `¡No olvides tu cita: ${eventText} a las ${format(dateTime, 'HH:mm')}`,
          data: { openAppOnClick: false },
          vibrate: false,
          lightColor: '#FF231F7C',
        },
        trigger: {
          date: dateTime,
        }
      });

      console.log('Notificación programada con éxito. ID:', notificationId);
    } catch (error) {
      console.error('Error al programar la notificación:', error);
    }
  }

  const addEvent = async () => {
    if (eventText) {
      const encryptedText = CryptoJS.AES.encrypt(eventText, CLAVE_KRYPTO).toString();
      const newEvent = { dateTime: selectedDate, text: encryptedText };
      setEventText('');

      agregarEventoFirestore({ dateTime: selectedDate, text: encryptedText, userId });

      reminderTimes.forEach(reminderTime => {
        const reminderDateTime = new Date(selectedDate.getTime() - reminderTime);
        scheduleNotification(reminderDateTime, eventText);
      });
    }
  };

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message: `Tengo una cita programada el ${format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}. Detalles: ${eventText}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartido en: ', result.activityType);
        } else {
          console.log('Compartido con éxito.');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartición cancelada.');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      Alert.alert('Tu cuenta y toda la información asociada a la misma ha sido eliminada');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      'Eliminar Cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta? Se eliminarán todos tus datos y citas guardadas. Esta acción es irreversible.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: handleDeleteAccount, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendario de Citas</Text>
      <Text style={styles.usuario}>Usuario: {userEmail}</Text>
      <View style={{ marginBottom: 20 }} />
      <View style={styles.eventForm}>
        <Text style={styles.selectedDateText}>
          Fecha y Hora seleccionadas: {format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}
        </Text>
        <TextInput
          style={styles.eventInput}
          placeholder="Cita con ..."
          value={eventText}
          onChangeText={(text) => setEventText(text)}
        />
        <Button title="Agrega la cita" onPress={addEvent} />
        <TouchableOpacity style={styles.shareButtonC} onPress={shareEvent}>
          <Text style={styles.buttonText}>Compartir Evento</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 40 }} />
      <Button
        title="Consulta las citas concertadas"
        onPress={() => navigation.navigate('ConsultarCitas')}
        style={styles.selectCitaButton}
      />
      <TouchableOpacity style={styles.vuelta} onPress={volver}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.borrarCuenta} onPress={showDeleteAccountAlert}>
        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e7faed',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#908788',
  },
  usuario: {
    fontSize: 20,
    color: '#b3612e',
    marginBottom: 15,
  },
  eventForm: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  shareButtonC: {
    backgroundColor: 'olive',
    color: '#fff',
    padding: 4,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextC: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectCitaButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  borrarCuenta: {
    backgroundColor: '#fd2d08',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginTop: 60,
    marginLeft: 130,
  },
  vuelta: {
    backgroundColor: '#36a7ce',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginTop: 60,
    marginLeft: 25,
    fontSize: 16,
  },
});

export default EventCalendar2;
