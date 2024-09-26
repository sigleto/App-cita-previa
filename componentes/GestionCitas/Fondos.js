import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const fondosPredefinidos = [
  { id: 1, nombre: 'Tablero', color: '#E0CDA9'},
  { id: 2, nombre: 'Oscuro', color: '#333333' },
  { id: 3, nombre: 'Azul', color: '#00A896' },
  { id: 4, nombre: 'Verde', color: '#76C893' },
  // Agrega más fondos según desees
];


export default function Fondos({ onFondoSeleccionado }) {
  const [fondoSeleccionado, setFondoSeleccionado] = useState(fondosPredefinidos[0]);

  const cambiarFondo = (fondo) => {
    setFondoSeleccionado(fondo);
    onFondoSeleccionado(fondo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecciona un fondo:</Text>
      <FlatList
        data={fondosPredefinidos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.fondoItem, { backgroundColor: item.color }]}
            onPress={() => cambiarFondo(item)}
          >
            <Text style={styles.fondoText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  fondoItem: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  fondoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
