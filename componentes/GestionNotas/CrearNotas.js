import React, { useState } from "react";
import {
  Share,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CrearNota() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [categoria, setCategoria] = useState("Personal");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  const scheduleNotification = async (noteTitle, noteDate) => {
    try {
      const ahora = Date.now();
      const objetivo = noteDate.getTime();
      const diferenciaMs = objetivo - ahora;

      const segundosRestantes = Math.ceil(diferenciaMs / 1000);

      if (segundosRestantes < 60) {
        console.log("🚫 Recordatorio omitido (demasiado cercano o pasado)");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📌 Recordatorio de Nota",
          body: `No olvides: ${noteTitle}`,
          sound: true,
        },
        trigger: {
          seconds: segundosRestantes,
          channelId: "default",
        },
      });

      console.log(
        `✅ Recordatorio programado para dentro de ${segundosRestantes} segundos`
      );
    } catch (error) {
      console.error("❌ Error al programar notificación:", error);
    }
  };

  const saveNote = async () => {
    if (!noteTitle.trim() || !noteText.trim()) {
      Alert.alert("Error", "El título y el contenido no pueden estar vacíos.");
      return;
    }

    if (categoria === "Recordatorio" && date <= new Date()) {
      Alert.alert(
        "Fecha inválida",
        "La fecha del recordatorio debe ser posterior a la actual."
      );
      return;
    }

    try {
      const id = Date.now().toString();
      const note = {
        id,
        titulo: noteTitle,
        texto: noteText,
        categoria,
        favorito: false,
        recordatorio: categoria === "Recordatorio" ? date.toISOString() : null,
      };

      const storedNotes = await AsyncStorage.getItem("notas");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(note);

      await AsyncStorage.setItem("notas", JSON.stringify(notes));

      if (categoria === "Recordatorio") {
        await scheduleNotification(note.titulo, date);
      }

      Alert.alert("Éxito", "Nota guardada con éxito");

      setNoteTitle("");
      setNoteText("");
      setCategoria("Personal");
      setDate(new Date());
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      Alert.alert("Error", "No se pudo guardar la nota.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Nueva Nota</Text>

        <TextInput
          style={styles.input}
          placeholder="Título de la nota"
          value={noteTitle}
          onChangeText={setNoteTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe tu nota aquí..."
          value={noteText}
          onChangeText={setNoteText}
          multiline
        />

        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => {
            setCategoria(itemValue);
            setShowDatePicker(itemValue === "Recordatorio");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Trabajo" value="Trabajo" />
          <Picker.Item label="Recordatorio" value="Recordatorio" />
        </Picker>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={saveNote}>
          <Icon name="save-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Guardar Nota</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("ConsultarNotas")}
        >
          <Icon name="book-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ver Notas Guardadas</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdf7e1",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4a4a4a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#28A745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  shareIcon: {
    position: "absolute",
    top: 50,
    right: 10,
    zIndex: 1,
    backgroundColor: "#edf7d9",
    padding: 5,
    borderRadius: 20,
  },
});
