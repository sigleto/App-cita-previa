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
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as Notifications from "expo-notifications";
import CryptoJS from "react-native-crypto-js";
import { CLAVE_KRYPTO } from "@env";
import { firebaseConfig, agregarEventoFirestore } from "./Firebase"; // Asegúrate de importar firebaseConfig correctamente
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const EventCalendar2 = ({ route }) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    route.params?.selectedDate ? new Date(route.params.selectedDate) : null
  );
  const [reminderTimes, setReminderTimes] = useState(
    route.params?.reminderTimes || []
  );
  const [eventText, setEventText] = useState("");
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/8959961143";
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userEmail =
    route.params?.userEmail || (user && user.email) || "Usuario Desconocido";

  const volver = () => {
    navigation.navigate("Home");
  };

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
          title: "Recordatorio de cita",
          body: `¡No olvides tu cita: ${eventText} a las ${format(
            dateTime,
            "HH:mm"
          )}`,
          data: { openAppOnClick: false },
          vibrate: false,
          lightColor: "#FF231F7C",
        },
        trigger: {
          date: dateTime,
        },
      });

      console.log("Notificación programada con éxito. ID:", notificationId);
    } catch (error) {
      console.error("Error al programar la notificación:", error);
    }
  };

  const addEvent = async () => {
    if (eventText && selectedDate) {
      const encryptedText = CryptoJS.AES.encrypt(
        eventText,
        CLAVE_KRYPTO
      ).toString();
      const newEvent = { dateTime: selectedDate, text: encryptedText };
      setEventText("");

      agregarEventoFirestore({
        dateTime: selectedDate,
        text: encryptedText,
        userId,
      });

      reminderTimes.forEach((reminderTime) => {
        const reminderDateTime = new Date(
          selectedDate.getTime() - reminderTime
        );
        scheduleNotification(reminderDateTime, eventText);
      });
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

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Compartido en: ", result.activityType);
        } else {
          console.log("Compartido con éxito.");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Compartición cancelada.");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      Alert.alert(
        "Tu cuenta y toda la información asociada a la misma ha sido eliminada"
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Se eliminarán todos tus datos y citas guardadas. Esta acción es irreversible.",
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
      const result = await Share.share({
        message:
          "Descarga nuestra aplicación y descubre todas las funcionalidades. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.citaprevia",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Compartido en: ", result.activityType);
        } else {
          console.log("Compartido con éxito.");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Compartición cancelada.");
      }
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
        style={styles.selectCitaButton}
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
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f8", // Un color de fondo más suave
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50", // Un color más oscuro y profesional
    textAlign: "center",
  },
  usuario: {
    fontSize: 18,
    color: "#e67e22", // Un color naranja más vibrante
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
    color: "#34495e", // Un color más oscuro para el texto
    textAlign: "center",
  },
  eventInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9", // Un fondo más claro para el input
  },
  shareButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  shareButtonC: {
    backgroundColor: "#8e44ad", // Un color morado para el botón de compartir
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
  selectCitaButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
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
  shareAppButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
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
