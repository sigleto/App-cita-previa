import React, { useState } from 'react';
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


const EventCalendar2 = ({ route } ) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    route.params?.selectedDate ? new Date(route.params.selectedDate) : new Date()
  );
 
  const [reminderTimeBeforeEvent, setReminderTimeBeforeEvent] = useState(
    route.params?.reminderTimeBeforeEvent || 6 * 60 * 60 * 1000
  );
  
  const [eventos, setEventos] = useState([]);
  const [eventText, setEventText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userEmail = route.params?.userEmail || (user && user.email) || 'Usuario Desconocido';


  
  // Función para programar una notificación push en un momento específico
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
          sound: '../../assets/alarma.wav',
          vibrate:true,
          vibrationPattern: [0, 250, 250, 250],
          

          autoCancel: true
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
      setEventos([...eventos, newEvent]);
      setEventText('');
  
      agregarEventoFirestore({ dateTime: selectedDate, text: encryptedText, userId });
  
      const reminderTime = new Date(selectedDate.getTime() - reminderTimeBeforeEvent);
      scheduleNotification(reminderTime, eventText);
    }
  };
  
  //FUNCIÓN PARA ELIMINAR LA CUENTA
  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      // Realiza cualquier otra acción necesaria después de la eliminación de la cuenta
      Alert.alert('Tu cuenta y toda la información asociada a la misma ha sido eliminada');
      navigation.navigate('Home'); // Redirige al usuario a la pantalla de autenticación
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
//AVISO PARA ANTES DE ELIMINAR LA CUENTA:
const showDeleteAccountAlert = () => {
  Alert.alert(
    'Eliminar Cuenta',
    '¿Estás seguro de que quieres eliminar tu cuenta? Se eliminarán todos tus datos y citas guardadas.Esta acción es irreversible.',
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
      {/*<FlatList
        data={eventos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.eventItem}>
            {format(item.dateTime, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", { locale: es })}: {item.text}
          </Text>
        )}
      />*/}
    </View>

    <View style={{ marginBottom: 40 }} />
    <Button
      title="Consulta las citas concertadas"
      onPress={() => navigation.navigate('ConsultarCitas')}
      style={styles.selectCitaButton}
    />
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
borrarCuenta:{
  backgroundColor: '#e74c3c', // Cambia el color del botón
  color: '#fff',
  padding:5,
  borderRadius: 5,
  marginTop:60,
  marginLeft:130,

},
resalto:{
  marginTop:20,
  color:"#4da305",
  fontSize:18,
  fontWeight:'bold'
},
picker:{
  marginTop:20,
  color:'#cd0a25',
  backgroundColor:'#f5bcc4'

}



});

export default EventCalendar2