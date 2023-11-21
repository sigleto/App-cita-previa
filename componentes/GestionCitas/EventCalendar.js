import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { agregarEventoFirestore, firebaseConfig, getPushNotificationToken } from './Firebase';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { scheduleNotificationAsync } from 'expo-notifications';

const EventCalendar = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [eventText, setEventText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user.uid;

  // Función para programar una notificación push en un momento específico
  const scheduleNotification = async (dateTime, eventText) => {
    try {
      const notificationId = await scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de evento',
          body: `¡No olvides tu evento: ${eventText} a las ${format(dateTime, 'HH:mm')}`,
        },
        trigger: {
          date: dateTime,
        },
      });

      console.log('Notificación programada con éxito. ID:', notificationId);
    } catch (error) {
      console.error('Error al programar la notificación:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const addEvent = async () => {
    if (eventText) {
      const newEvent = { dateTime: selectedDate, text: eventText };
      setEventos([...eventos, newEvent]); // Actualizar estado local
      setEventText('');

      // Agregar la nueva cita a Firestore
      agregarEventoFirestore({ dateTime: selectedDate, text: eventText, userId });

      // Calcular la hora del recordatorio (30 minutos antes del evento)
      const reminderTime = new Date(selectedDate.getTime() - 30 * 60000); // 30 minutos en milisegundos

      // Enviar notificación push 30 minutos antes del evento
      scheduleNotification(reminderTime, eventText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendario de Citas</Text>
      <Text style={styles.usuario}>Usuario: {user.email}</Text>
      <Button title="Seleccionar Fecha y Hora" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={{ marginBottom: 20 }} />
      <View style={styles.eventForm}>
        <Text style={styles.selectedDateText}>
          Fecha y Hora seleccionadas: {format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}
        </Text>
        <TextInput
          style={styles.eventInput}
          placeholder="Evento"
          value={eventText}
          onChangeText={(text) => setEventText(text)}
        />
        <Button title="Agrega la cita" onPress={addEvent} />
        <FlatList
          data={eventos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.eventItem}>
              {format(item.dateTime, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}: {item.text}
            </Text>
          )}
        />
      </View>

      <View style={{ marginBottom: 40 }} />
      <Button
        title="Consulta las citas concertadas"
        onPress={() => navigation.navigate('ConsultarCitas')}
        style={styles.selectCitaButton}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e7faed', // Cambia el color de fondo
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#908788', // Cambia el color del texto
  },
  datePicker: {
    width: '100%',
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
  eventItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectDateButton: {
    backgroundColor: '#e74c3c', // Cambia el color del botón
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop:20,
    
  },
  selectCitaButton: {
    backgroundColor: '#e74c3c', // Cambia el color del botón
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    
  },
  usuario:{
    fontSize:20,
    color:'#b3612e',
    marginBottom:15,
  },
});

export default EventCalendar