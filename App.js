import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Share,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Contacto from "./componentes/Contacto";
import DescargoResponsabilidad from "./componentes/DescargoResponsabilidad";
import SeguridadDatos from "./componentes/SeguridadDatos";
import PoliticaPrivacidad from "./componentes/PoliticaPrivacidad";
import { PrincipalStack, PresentacionStack } from "./componentes/Navigation";
import { AuthProvider } from "./componentes/AuthContext";

enableScreens();

const Drawer = createDrawerNavigator();

const shareApp = async () => {
  try {
    const result = await Share.share({
      message:
        "Descarga nuestra aplicación y descubre todas las funcionalidades. ¡Haz clic aquí para descargarla! https://play.google.com/store/apps/details?id=com.sigleto.citaprevia",
    });
    if (result.action === Share.dismissedAction) {
      Alert.alert("Compartir cancelado");
    }
  } catch (error) {
    Alert.alert("Error", "Hubo un problema al intentar compartir la app.");
  }
};

const ShareScreen = () => {
  const handleShare = useCallback(() => {
    shareApp();
  }, []);

  return (
    <View style={styles.shareContainer}>
      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Text style={styles.shareText}>📤 Compartir la aplicación</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerShown: false,
              drawerStyle: { backgroundColor: "#f7f7f7" },
              drawerLabelStyle: { fontSize: 18, marginLeft: -10 },
              drawerActiveTintColor: "#007AFF",
              drawerInactiveTintColor: "#333",
              drawerType: "front", // Modern drawer
            }}
          >
            <Drawer.Screen
              name="Inicio"
              component={PrincipalStack}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Contacto"
              component={Contacto}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="email" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Cómo funciona"
              component={PresentacionStack}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Datos seguros"
              component={SeguridadDatos}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="lock-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Responsabilidad"
              component={DescargoResponsabilidad}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="shield-alert-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Política de Privacidad"
              component={PoliticaPrivacidad}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Compartir"
              component={ShareScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  shareContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  shareButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shareText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
