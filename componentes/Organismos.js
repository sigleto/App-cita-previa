import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Organismos = () => {
  const navigation = useNavigation();
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-9777143216104753/6399218356';
  const navigateToOrganismo = (ruta) => {
    navigation.navigate(ruta);
  };

  const opciones = [
    { nombre: 'CitaMédica', ruta: 'CitaMedica' },
    { nombre: 'Bancos', ruta: 'Bancos' },
    { nombre: 'Ayuntamientos', ruta: 'Ayuntamientos' },
    { nombre: 'Comunidades Autónomas', ruta: 'ComunidadesAutonomas' },
    { nombre: 'A E A T', ruta: 'AEAT' },
    { nombre: 'Renovación DNI/Pasaporte', ruta: 'DNI' },
    { nombre: 'Inspección Técnica de vehículos', ruta: 'CitaITV' },
    { nombre: 'S E P E', ruta: 'SEPE' },
    { nombre: 'M U F A C E', ruta: 'MUFACE' },
    { nombre: 'Renovación Permiso de Conducir', ruta: 'PermisoConducir' },
    { nombre: 'Clases Pasivas', ruta: 'ClasesPasivas' },
    { nombre: 'Seguridad Social', ruta: 'SeguridadSocial' },
    { nombre: 'Extranjeria', ruta: 'Extranjeria' },
    { nombre: 'Registros Civiles', ruta: 'RegistrosCiviles' },
    { nombre: 'Registros de la Propiedad', ruta: 'RegistrosPropiedad' },
    { nombre: 'Guardia Civil', ruta: 'GuardiaCivil' },


  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloOrg}>Con que organismo quieres concertar la cita?</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  tituloOrg: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:70,
    textAlign:'center',
    color:'#54722e',
    textDecorationLine:'underline'
  },
  organismos: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  opcion: {
    display:'flex',
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width:250,
    alignItems:'center'
  },
  opcionTexto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Organismos;
