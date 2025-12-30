import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import * as Notifications from "expo-notifications";
import CryptoJS from "react-native-crypto-js";
import { CLAVE_KRYPTO } from "@env";
import { auth, db, agregarEventoFirestore } from "./Firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EventCalendar2 = ({ route }) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    route.params?.selectedDate ? new Date(route.params.selectedDate) : null
  );
  const [reminderTimes, setReminderTimes] = useState(
    route.params?.reminderTimes || []
  );
  const [eventText, setEventText] = useState("");
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userEmail =
    route.params?.userEmail || (user && user.email) || "Usuario Desconocido";

  const volver = () => {
    navigation.navigate("Home");
  };

  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      // Solo mostramos la notificación si realmente ha llegado su hora
      // y no simplemente porque se acaba de programar
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });

  const scheduleNotification = async (dateTime, text) => {
    try {
      const ahoraMs = Date.now();
      const objetivoMs = dateTime.getTime();

      const diferenciaMs = objetivoMs - ahoraMs;
      const segundosRestantes = Math.ceil(diferenciaMs / 1000);

      if (segundosRestantes < 60) {
        console.log("🚫 Aviso ignorado (demasiado cercano o pasado)");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📌 Recordatorio de cita",
          body: `¡No olvides tu cita: ${text}!`,
          sound: true,
        },
        trigger: {
          seconds: segundosRestantes,
          channelId: "default",
        },
      });

      console.log(`✅ Programada para dentro de ${segundosRestantes} segundos`);
    } catch (error) {
      console.error("❌ Error técnico:", error);
    }
  };

  // --- FUNCIÓN CORREGIDA ---
  const addEvent = async () => {
    if (eventText && selectedDate && userId) {
      try {
        const encryptedText = CryptoJS.AES.encrypt(
          eventText,
          CLAVE_KRYPTO
        ).toString();

        // 1. Guardamos en Firebase
        await agregarEventoFirestore({
          dateTime: selectedDate,
          text: encryptedText,
          userId,
        });

        // 2. Programamos los recordatorios
        const ahora = new Date();

        reminderTimes.forEach((reminderTime) => {
          // Calculamos cuándo debe sonar el aviso
          const reminderDateTime = new Date(
            selectedDate.getTime() - reminderTime
          );

          // Solo programamos si faltan más de 10 segundos para el aviso
          // (Si falta menos, no tiene sentido programarlo porque saltaría casi al instante)
          if (reminderDateTime.getTime() > ahora.getTime() + 10000) {
            console.log(
              `Programando aviso para: ${format(
                reminderDateTime,
                "dd/MM HH:mm"
              )}`
            );
            scheduleNotification(reminderDateTime, eventText);
          } else {
            console.log(
              "Aviso omitido: La fecha de recordatorio ya pasó o es demasiado cercana."
            );
          }
        });

        setEventText("");
        // Opcional: navigation.navigate("Home") o similar aquí tras el éxito
      } catch (error) {
        console.error("Error al guardar el evento:", error);
        Alert.alert("Error", "No se pudo guardar la cita.");
      }
    } else if (!userId) {
      Alert.alert("Error", "Usuario no identificado.");
    } else {
      Alert.alert("Error", "Por favor, introduce los detalles de la cita.");
    }
  };

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message: `Tengo una cita programada el ${format(
          selectedDate,
          "dd 'de' LLLL 'de' yyyy 'a las' HH:mm",
          { locale: es }
        )}. Detalles: ${eventText}`,
      });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      Alert.alert("Cuenta eliminada", "Toda la información ha sido eliminada.");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      Alert.alert(
        "Error",
        "Reautenticación requerida para eliminar la cuenta."
      );
    }
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: handleDeleteAccount,
          style: "destructive",
        },
      ]
    );
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Descarga nuestra aplicación: https://play.google.com/store/apps/details?id=com.sigleto.citaprevia",
      });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>

      <Text style={styles.header}>Calendario de Citas</Text>
      <Text style={styles.usuario}>Usuario: {userEmail}</Text>

      <View style={{ marginBottom: 20 }} />

      {selectedDate && (
        <View style={styles.eventForm}>
          <Text style={styles.selectedDateText}>
            Fecha y Hora seleccionadas:{" "}
            {format(selectedDate, "dd 'de' LLLL 'de' yyyy 'a las' HH:mm", {
              locale: es,
            })}
          </Text>

          <TextInput
            style={styles.eventInput}
            placeholder="Cita con ..."
            value={eventText}
            onChangeText={(text) => setEventText(text)}
          />

          {/* BOTÓN DE AGREGAR CITA */}
          <Button title="Agrega la cita" onPress={addEvent} />

          <TouchableOpacity style={styles.shareButtonC} onPress={shareEvent}>
            <Text style={styles.buttonText}>Compartir Evento</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginBottom: 40 }} />

      <Button
        title="Consulta las citas concertadas"
        onPress={() => navigation.navigate("ConsultarCitas")}
      />

      <TouchableOpacity style={styles.vuelta} onPress={volver}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.borrarCuenta}
        onPress={showDeleteAccountAlert}
      >
        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- TUS ESTILOS ORIGINALES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  usuario: {
    fontSize: 18,
    color: "#e67e22",
    marginBottom: 20,
    fontWeight: "500",
  },
  eventForm: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#34495e",
    textAlign: "center",
  },
  eventInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  shareButtonC: {
    backgroundColor: "#8e44ad",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  borrarCuenta: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 7,
    marginTop: 100,
    width: "37%",
    alignItems: "center",
    marginBottom: 30,
  },
  vuelta: {
    backgroundColor: "#36a7ce",
    padding: 7,
    borderRadius: 10,
    marginTop: 80,
    width: "50%",
    alignItems: "center",
  },
  shareIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "#edf7d9",
    padding: 10,
    borderRadius: 20,
    elevation: 3,
  },
});

export default EventCalendar2;
