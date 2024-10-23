import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function CrearNota() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoria, setCategoria] = useState('Personal'); // Categoría seleccionada
  const navigation = useNavigation();
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6921150380725872/8959961143';
  const saveNote = async () => {
    try {
      const id = Date.now().toString();
      const note = {
        id,
        titulo: noteTitle,
        texto: noteText,
        categoria,
        favorito: false, // Inicialmente no es favorita
        dateTime: selectedDate.toISOString(),
      };

      const storedNotes = await AsyncStorage.getItem('notas');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(note);

      await AsyncStorage.setItem('notas', JSON.stringify(notes));
      Alert.alert('Nota guardada con éxito');
      setNoteTitle('');
      setNoteText('');
      setCategoria('Personal'); // Restablece la categoría predeterminada
      scheduleNotification(note.titulo, new Date(note.dateTime));
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  const scheduleNotification = async (noteTitle, dateTime) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Recordatorio de Nota',
        body: `No olvides: ${noteTitle}`,
      },
      trigger: {
        date: dateTime,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear una Nueva Nota</Text>
      <TextInput
        style={styles.input}
        placeholder="Título de la nota"
        value={noteTitle}
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nota aquí..."
        value={noteText}
        onChangeText={setNoteText}
      />

      {/* Selector de Categoría */}
      <Text style={styles.label}>Seleccionar categoría:</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Trabajo" value="Trabajo" />
        <Picker.Item label="Recordatorio" value="Recordatorio" />
      </Picker>

      <Button title="Guardar Nota" onPress={saveNote} />
      <View style={styles.buttonContainer}>
        <Button
          title="Ver Notas Guardadas"
          onPress={() => navigation.navigate('ConsultarNotas')}
          color="green"
        />
      </View>
      <View style={styles.banner}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      </View>
      
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdf7e1',
    justifyContent:'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'sans-serif'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: 'sans-serif-light',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color:"olive",
    fontWeight:"bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    color: "#1f0081",
  },
  buttonContainer: {
    marginTop: 20,
  },
  banner:{
    marginTop:50
  }
});
