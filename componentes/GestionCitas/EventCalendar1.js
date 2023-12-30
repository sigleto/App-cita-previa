
import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { agregarEventoFirestore, firebaseConfig, getPushNotificationToken } from './Firebase';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import * as Notifications from 'expo-notifications';
import CryptoJS from 'react-native-crypto-js';
import {CLAVE_KRYPTO} from '@env'
import { Picker } from '@react-native-picker/picker'


const EventCalendar1 = ({ route } ) => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [eventText, setEventText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderTimeBeforeEvent, setReminderTimeBeforeEvent] = useState(6 * 60 * 60 * 1000); // Valor predeterminado: 6 horas antes
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userEmail = route.params?.userEmail || (user && user.email) || 'Usuario Desconocido';

 


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

  const pasarPagina = () => {
    navigation.navigate('EventCalendar2',{ selectedDate: selectedDate.getTime(),
      reminderTimeBeforeEvent: reminderTimeBeforeEvent,}); // Reemplaza 'eventCalendar2' con el nombre real de tu pantalla de destino
  };

  
  const [backgroundColor, setBackgroundColor] = useState('#014b49');

  const startColorAnimation = () => {
    const intervalId = setInterval(() => {
      setBackgroundColor((prevColor) => (prevColor === '#014b49' ? '#960305' : '#014b49'));
    }, 1000); // Cambia el color cada 2 segundos (ajusta según sea necesario)

    // Detén la animación después de cierto tiempo (por ejemplo, después de 10 segundos)
    setTimeout(() => {
      clearInterval(intervalId);
      setBackgroundColor('#014b49'); // Restaura el color original
    }, 10000); // Detener la animación después de 10 segundos (ajusta según sea necesario)
  };

  useEffect(() => {
    startColorAnimation(); // Inicia la animación cuando se carga el componente
  }, []);


return (
  <View style={styles.container}>
    <Text style={styles.header}>Calendario de Citas</Text>
    <Text style={styles.usuario}>Usuario: {userEmail}</Text>
    <Text style={styles.opcion}>Guarda una nueva cita</Text>
    <TouchableOpacity style={styles.relleno} onPress={showDatePicker}>
        <Text style={[styles.selectDateTimeText,{ backgroundColor: backgroundColor }]}>Selecciona Fecha y Hora de la cita</Text>
      </TouchableOpacity>
    <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="datetime"
    onConfirm={(date) => {
      handleConfirm(date);
      setIsDateTimeSelected(true); // Actualiza el estado cuando se confirma la fecha y la hora
    }}
    onCancel={hideDatePicker}
    
    />
      {isDateTimeSelected && (
      <Text style={styles.selectedDateText}>
        Fecha y Hora seleccionadas: {format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}
      </Text>
    )}
     
     {isDateTimeSelected && (
       
      <View>
        <Text style={styles.resalto}>Selecciona cuánto tiempo antes deseas recibir el aviso:</Text>
        <Picker
           style={styles.picker}
          selectedValue={reminderTimeBeforeEvent}
          onValueChange={(itemValue) => setReminderTimeBeforeEvent(itemValue)}
          mode='dropdown'
        >
        <Picker.Item label="6 horas antes" value={6 * 60 * 60 * 1000} />
        <Picker.Item label="24 horas antes" value={24 * 60 * 60 * 1000} />
        <Picker.Item label="48 horas antes" value={48 * 60 * 60 * 1000} />
        </Picker>
        </View>
    )}
     <TouchableOpacity
            style={styles.selectDateButton}
            onPress={pasarPagina}
          >
            <Text >CONTINUAR</Text>
          </TouchableOpacity>


    </View>
)
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
        marginBottom: 40,
        color: '#908788',
      },
      usuario: {
        fontSize: 20,
        color: '#b3612e',
        marginBottom: 45,
        fontWeight:'bold'
      },
      selectDateButton: {
        backgroundColor: '#62f12c',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 90,
      },
      resalto: {
        marginTop: 20,
        color: "#4da305",
        fontSize: 18,
        fontWeight: 'bold'
      },
      picker: {
        marginTop: 20,
        color: '#cd0a25',
        backgroundColor: '#f5bcc4'
      },
      selectedDateText: {
        fontSize: 16,
        marginBottom: 10,
      },
      selectDateTimeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:  '#07faf3', // You can change the color as per your preference
        marginTop: 10,
        backgroundColor:"#014b49",
        padding:20,
      },
      opcion:{
        fontSize: 17,
        fontWeight: 'bold',
        // You can change the color as per your preference
        marginTop: 10,

      }
      
    });
    

export default EventCalendar1