// ConsultarCitas.js
import React, { useEffect, useState } from "react";
import {
  Share,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./Firebase"; // <-- usa la instancia compartida
import format from "date-fns/format";
import es from "date-fns/locale/es";
import CryptoJS from "react-native-crypto-js";
import { CLAVE_KRYPTO } from "@env";
import Anuncio from "../Avisos/Anuncio";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Fondos from "./Fondos";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Configuración de la localización en español para el calendario
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

export default function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [fondoSeleccionado, setFondoSeleccionado] = useState({
    color: "#f0f0f0",
  }); // Fondo por defecto
  const [textColor, setTextColor] = useState("#333"); // Color por defecto para el texto

  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const navigation = useNavigation();

  // Cambiar color del texto según el fondo
  useEffect(() => {
    if (fondoSeleccionado.color === "#333333") {
      setTextColor("#fff"); // Texto claro para fondo oscuro
    } else {
      setTextColor("#333"); // Texto oscuro para fondos claros
    }
  }, [fondoSeleccionado]);

  // Consultar citas en Firestore
  useEffect(() => {
    const consultarCitas = async () => {
      try {
        const eventosCollection = collection(db, "eventos");
        const eventosSnapshot = await getDocs(eventosCollection);

        const citasData = [];
        eventosSnapshot.forEach((doc) => {
          const eventData = doc.data();
          if (eventData.userId === userId) {
            const decryptedText = CryptoJS.AES.decrypt(
              eventData.text,
              CLAVE_KRYPTO
            ).toString(CryptoJS.enc.Utf8);
            citasData.push({ id: doc.id, ...eventData, text: decryptedText });
          }
        });
        citasData.sort((a, b) => a.dateTime.toMillis() - b.dateTime.toMillis());
        setCitas(citasData);
        setLoading(false);
      } catch (error) {
        console.error("Error al consultar citas: ", error);
        setLoading(false);
      }
    };

    consultarCitas();
  }, [userId]);

  // Función para eliminar cita
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
      setCitas(citas.filter((cita) => cita.id !== id));
    } catch (error) {
      console.error("Error al eliminar cita: ", error);
    }
  };

  // Confirmación de eliminación
  const confirmDelete = (id) => {
    Alert.alert(
      "Eliminar Cita",
      "¿Estás seguro de que quieres eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => handleDelete(id) },
      ]
    );
  };

  // Marcar fechas en el calendario
  const marcarFechas = citas.reduce((acc, cita) => {
    const fecha = format(cita.dateTime.toDate(), "yyyy-MM-dd");
    acc[fecha] = { marked: true, dotColor: "#00A896" };
    return acc;
  }, {});

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
    <View
      style={[styles.container, { backgroundColor: fondoSeleccionado.color }]}
    >
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>

      <Text style={[styles.header, { color: textColor }]}>
        Citas concertadas
      </Text>

      {/* Componente para seleccionar el fondo */}
      <Fondos onFondoSeleccionado={setFondoSeleccionado} />

      <Anuncio />

      {/* Toggle para cambiar entre vista de lista y vista de calendario */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: textColor }]}>
          Vista Calendario
        </Text>
        <Switch
          value={isCalendarView}
          onValueChange={() => setIsCalendarView(!isCalendarView)}
        />
      </View>

      {isCalendarView ? (
        <Calendar
          markedDates={marcarFechas}
          onDayPress={(day) => {
            const fechaSeleccionada = citas.filter(
              (cita) =>
                format(cita.dateTime.toDate(), "yyyy-MM-dd") === day.dateString
            );
            Alert.alert(
              "Citas para este día",
              fechaSeleccionada.map((cita) => cita.text).join("\n")
            );
          }}
          theme={{
            selectedDayBackgroundColor: "#00A896",
            todayTextColor: "#00A896",
            arrowColor: "#00A896",
            dotColor: "#00A896",
            selectedDotColor: "#ffffff",
          }}
        />
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.citaItem,
                {
                  backgroundColor:
                    fondoSeleccionado.color === "#333333" ? "#444" : "#fff",
                },
              ]}
            >
              {item.dateTime && (
                <>
                  <Text style={[styles.texto, { color: textColor }]}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={textColor}
                    />{" "}
                    <Text style={[styles.boldText, { color: textColor }]}>
                      {format(
                        item.dateTime.toDate(),
                        "dd 'de' LLLL 'de' yyyy 'a las' HH:mm",
                        { locale: es }
                      )}
                    </Text>
                  </Text>
                  <Text style={[styles.texto, { color: textColor }]}>
                    <Ionicons
                      name="clipboard-outline"
                      size={20}
                      color={textColor}
                    />{" "}
                    <Text style={[styles.boldText, { color: textColor }]}>
                      {item.text}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(item.id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color={
                        fondoSeleccionado.color === "#333333"
                          ? "#ff6666"
                          : "red"
                      }
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.atras}
        onPress={() => navigation.navigate("EventCalendar2")}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        <Text style={styles.atrasText}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
  },
  citaItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  deleteButton: {
    alignSelf: "flex-end",
    padding: 5,
    backgroundColor: "#ffeeee",
    borderRadius: 5,
    marginTop: 10,
  },
  atras: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A896",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  atrasText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
  shareIcon: {
    position: "absolute",
    top: 80,
    right: 10,
    zIndex: 1,
  },
});
