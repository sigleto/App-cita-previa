import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; 
import Anuncio from "../Avisos/Anuncio";

export default function ConsultarNotas() {
  const [notas, setNotas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerNotas = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notas');
        const notes = storedNotes ? JSON.parse(storedNotes) : [];
        setNotas(notes);
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };

    obtenerNotas();
  }, []);

  const eliminarNota = async (id) => {
    try {
      const updatedNotas = notas.filter(nota => nota.id !== id);
      await AsyncStorage.setItem('notas', JSON.stringify(updatedNotas));
      setNotas(updatedNotas);
      Alert.alert('Nota eliminada');
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar Nota",
      "¿Estás seguro de que quieres eliminar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => eliminarNota(id) }
      ]
    );
  };

  const compartirNota = async (titulo, texto) => {
    try {
      await Share.share({
        message: `Título: ${titulo}\n\nTexto: ${texto}`,
      });
    } catch (error) {
      console.error('Error al compartir la nota:', error);
    }
  };

  const toggleFavorito = async (id) => {
    const updatedNotas = notas.map(nota =>
      nota.id === id ? { ...nota, favorito: !nota.favorito } : nota
    );
    await AsyncStorage.setItem('notas', JSON.stringify(updatedNotas));
    setNotas(updatedNotas);
  };

  const notasFiltradas = notas.filter(nota =>
    categoriaSeleccionada === 'Todas' || nota.categoria === categoriaSeleccionada
  );

  return (
    <View style={styles.container}>
      <Anuncio/>
      <Text style={styles.label}>Filtrar por categoría:</Text>
      <Picker
        selectedValue={categoriaSeleccionada}
        onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todas" value="Todas" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Trabajo" value="Trabajo" />
        <Picker.Item label="Recordatorio" value="Recordatorio" />
      </Picker>

      <FlatList
        data={notasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nota}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.texto}>{item.texto}</Text>
            
            <TouchableOpacity onPress={() => compartirNota(item.titulo, item.texto)}>
              <Text style={styles.compartir}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmarEliminar(item.id)}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botón de Volver como TouchableOpacity */}
      <TouchableOpacity style={styles.volverButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.volverText}>VOLVER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: "#fdf7e1",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: "olive",
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    color: "#1f0081",
  },
  nota: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 16,
    marginTop: 5,
  },
  compartir: {
    color: 'blue',
    marginTop: 5,
  },
  eliminar: {
    color: 'red',
    marginTop: 5,
  },
  volverButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  volverText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
