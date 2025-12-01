import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "../../utils/expo-web-patch"; // AUTO-PATCHED;

const EventCalendar1 = ({ route }) => {
  const navigation = useNavigation();
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/8959961143";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderTimes, setReminderTimes] = useState({
    oneDay: false,
    twoDays: false,
    threeDays: false,
  });
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userEmail =
    route.params?.userEmail || (user && user.email) || "Usuario Desconocido";

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    setIsDateTimeSelected(true);
  };

  const pasarPagina = () => {
    const reminderTimesInMs = [];
    if (isDateTimeSelected) {
      if (reminderTimes.oneDay) reminderTimesInMs.push(24 * 60 * 60 * 1000);
      if (reminderTimes.twoDays) reminderTimesInMs.push(48 * 60 * 60 * 1000);
      if (reminderTimes.threeDays) reminderTimesInMs.push(72 * 60 * 60 * 1000);
    }

    navigation.navigate("EventCalendar2", {
      selectedDate: isDateTimeSelected ? selectedDate.getTime() : null,
      reminderTimes: reminderTimesInMs,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendario de Citas</Text>
      <Text style={styles.usuario}>Usuario: {userEmail}</Text>
      <Text style={styles.opcion}>Guarda una nueva cita</Text>

      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>
          Selecciona Fecha y Hora de la cita
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {isDateTimeSelected && (
        <Text style={styles.selectedDateText}>
          Fecha y Hora seleccionadas:{" "}
          {format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", {
            locale: es,
          })}
        </Text>
      )}

      {isDateTimeSelected && (
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderTitle}>
            Selecciona cuánto tiempo antes deseas recibir el aviso:
          </Text>
          <CheckBox
            title="24 horas antes"
            checked={reminderTimes.oneDay}
            onPress={() =>
              setReminderTimes({
                ...reminderTimes,
                oneDay: !reminderTimes.oneDay,
              })
            }
            containerStyle={styles.checkBox}
          />
          <CheckBox
            title="Dos días antes"
            checked={reminderTimes.twoDays}
            onPress={() =>
              setReminderTimes({
                ...reminderTimes,
                twoDays: !reminderTimes.twoDays,
              })
            }
            containerStyle={styles.checkBox}
          />
          <CheckBox
            title="Tres días antes"
            checked={reminderTimes.threeDays}
            onPress={() =>
              setReminderTimes({
                ...reminderTimes,
                threeDays: !reminderTimes.threeDays,
              })
            }
            containerStyle={styles.checkBox}
          />
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={pasarPagina}>
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Centrado vertical y horizontal
    padding: 20,
    backgroundColor: "#f0f8f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#014b49",
    marginBottom: 30, // Más espacio para separar del contenido
    textAlign: "center",
  },
  usuario: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20, // Más espacio
    textAlign: "center",
  },
  opcion: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30, // Más espacio
    textAlign: "center",
    fontWeight: "500", // Semi-negrita para destacar
  },
  dateButton: {
    backgroundColor: "#02735E",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%", // Ocupa todo el ancho disponible
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#014b49",
    marginVertical: 20, // Más espacio
    textAlign: "center",
    fontWeight: "500", // Semi-negrita para destacar
  },
  reminderContainer: {
    backgroundColor: "#e8f5e9",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "100%", // Ocupa todo el ancho disponible
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#014b49",
    marginBottom: 15,
    textAlign: "center",
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: "#019267",
    padding: 15,
    borderRadius: 10,
    marginTop: 30, // Más espacio
    width: "100%", // Ocupa todo el ancho disponible
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 35,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default EventCalendar1;
