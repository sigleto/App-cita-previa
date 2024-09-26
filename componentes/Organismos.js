import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Organismos = () => {
  const navigation = useNavigation();
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6921150380725872/8959961143';
  
  const navigateToOrganismo = (ruta) => {
    navigation.navigate(ruta);
  };

  const opciones = [
    { nombre: 'Solicita cita Médica', ruta: 'CitaMedica' },
    { nombre: 'Bancos', ruta: 'Bancos' },
    { nombre: 'Ayuntamientos', ruta: 'Ayuntamientos' },
    { nombre: 'Comunidades Autónomas', ruta: 'ComunidadesAutonomas' },
    { nombre: 'A E A T', ruta: 'AEAT' },
    { nombre: 'Renovación DNI/Pasaporte', ruta: 'DNI' },
    { nombre: 'Inspección Técnica de Vehículos', ruta: 'CitaITV' },
    { nombre: 'S E P E', ruta: 'SEPE' },
    { nombre: 'M U F A C E', ruta: 'MUFACE' },
    { nombre: 'Renovación Permiso de Conducir', ruta: 'PermisoConducir' },
    { nombre: 'Clases Pasivas', ruta: 'ClasesPasivas' },
    { nombre: 'Seguridad Social', ruta: 'SeguridadSocial' },
    { nombre: 'Extranjería', ruta: 'Extranjeria' },
    { nombre: 'Registros Civiles', ruta: 'RegistrosCiviles' },
    { nombre: 'Registros de la Propiedad', ruta: 'RegistrosPropiedad' },
    { nombre: 'Guardia Civil', ruta: 'GuardiaCivil' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloOrg}>¿Con qué organismo quieres concertar la cita?</Text>
      
      {/* Banner de anuncios */}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />

      <View style={styles.organismos}>
        {opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion.ruta}
            style={styles.opcion}
            onPress={() => navigateToOrganismo(opcion.ruta)}
          >
            <Text style={styles.opcionTexto}>{opcion.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Descargo de responsabilidad */}
      <Text style={styles.descargo}>
        ** Esta aplicación no está afiliada ni representa a ninguna entidad gubernamental. ** 
      </Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7',
  },
  tituloOrg: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
    color: '#54722e',
    textDecorationLine: 'underline',
  },
  organismos: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  opcion: {
    backgroundColor: '#8baaf7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 3,  // Para darle una pequeña sombra y destacar el botón
  },
  opcionTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  descargo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red',  // Rojo para mayor visibilidad
    paddingHorizontal: 10,
  },
});

export default Organismos;
