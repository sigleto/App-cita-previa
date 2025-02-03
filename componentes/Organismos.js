import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Organismos = () => {
  const navigation = useNavigation();
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/8959961143";

  const navigateToOrganismo = (ruta) => {
    navigation.navigate(ruta);
  };

  const opciones = [
    { nombre: "Solicita cita Médica", ruta: "CitaMedica", icono: "hospital" },
    { nombre: "Bancos", ruta: "Bancos", icono: "bank" },
    { nombre: "Ayuntamientos", ruta: "Ayuntamientos", icono: "city" },
    {
      nombre: "Comunidades Autónomas",
      ruta: "ComunidadesAutonomas",
      icono: "home-city",
    },
    { nombre: "A E A T", ruta: "AEAT", icono: "file-document" },
    {
      nombre: "Renovación DNI/Pasaporte",
      ruta: "DNI",
      icono: "card-account-details",
    },
    {
      nombre: "Inspección Técnica de Vehículos",
      ruta: "CitaITV",
      icono: "car",
    },
    { nombre: "S E P E", ruta: "SEPE", icono: "briefcase" },
    { nombre: "M U F A C E", ruta: "MUFACE", icono: "account-group" },
    {
      nombre: "Renovación Permiso de Conducir",
      ruta: "PermisoConducir",
      icono: "car-key",
    },
    { nombre: "Clases Pasivas", ruta: "ClasesPasivas", icono: "account-cash" },
    {
      nombre: "Seguridad Social",
      ruta: "SeguridadSocial",
      icono: "shield-account",
    },
    { nombre: "Extranjería", ruta: "Extranjeria", icono: "earth" },
    { nombre: "Registros Civiles", ruta: "RegistrosCiviles", icono: "book" },
    {
      nombre: "Registros de la Propiedad",
      ruta: "RegistrosPropiedad",
      icono: "home",
    },
    { nombre: "Guardia Civil", ruta: "GuardiaCivil", icono: "police-badge" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloOrg}>
        ¿Con qué organismo quieres concertar la cita?
      </Text>

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
            <MaterialCommunityIcons
              name={opcion.icono}
              size={24}
              color="#ffffff"
              style={styles.icono}
            />
            <Text style={styles.opcionTexto}>{opcion.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.descargo}>
        ** Esta aplicación no está afiliada ni representa a ninguna entidad
        gubernamental. **
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f7f7f7",
  },
  tituloOrg: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center",
    color: "#54722e",
    textDecorationLine: "underline",
  },
  organismos: {
    flexDirection: "column",
    alignItems: "center",
  },
  opcion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8baaf7",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    elevation: 3,
  },
  icono: {
    marginRight: 10,
  },
  opcionTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  descargo: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: "red",
    paddingHorizontal: 10,
  },
});

export default Organismos;
