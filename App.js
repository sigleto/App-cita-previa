import "react-native-reanimated"; // OBLIGATORIO: Primera línea
import React, { useEffect } from "react";
import { Platform, Alert, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import mobileAds from "react-native-google-mobile-ads";

// Tus componentes
import Contacto from "./componentes/Contacto";
import { PrincipalStack, PresentacionStack } from "./componentes/Navigation";
import DescargoResponsabilidad from "./componentes/DescargoResponsabilidad";
import SeguridadDatos from "./componentes/SeguridadDatos";
import PoliticaPrivacidad from "./componentes/PoliticaPrivacidad";
import { AuthProvider } from "./componentes/AuthContext";

enableScreens();

const Drawer = createDrawerNavigator();

/* =========================
   CONFIGURACIÓN DE NOTIFICACIONES
   ========================= */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  useEffect(() => {
    const inicializarApp = async () => {
      // 1. Inicializar Anuncios
      try {
        await mobileAds().initialize();
        console.log("AdMob inicializado");
      } catch (e) {
        console.log("Error inicializando Ads:", e);
      }

      // 2. Configurar Canal de Notificaciones (Android)
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Recordatorios",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // 3. Gestión de Permisos de Notificación
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      if (existingStatus !== "granted") {
        Alert.alert(
          "Permisos Requeridos",
          "Bienvenido. Para que la agenda pueda recordarte tus citas, necesitamos que permitas las notificaciones.",
          [
            {
              text: "Más tarde",
              style: "cancel",
            },
            {
              text: "Configurar",
              onPress: async () => {
                const { status } =
                  await Notifications.requestPermissionsAsync();
                if (status !== "granted" && Platform.OS === "android") {
                  Alert.alert(
                    "Aviso",
                    "Si no activas las notificaciones, no recibirás los avisos de tus citas."
                  );
                }
              },
            },
          ]
        );
      }
    };

    inicializarApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerShown: false,
              overlayColor: "rgba(0,0,0,0.5)",
              drawerStyle: {
                backgroundColor: "#f7f7f7",
                width: 280,
              },
              drawerLabelStyle: {
                fontSize: 18,
                marginLeft: -10,
              },
              drawerActiveTintColor: "#007AFF",
              drawerInactiveTintColor: "#333",
            }}
          >
            <Drawer.Screen
              name="Inicio"
              component={PrincipalStack}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                ),
                drawerLabel: "Inicio",
              }}
            />

            <Drawer.Screen
              name="Contacto"
              component={Contacto}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="email"
                    size={size}
                    color={color}
                  />
                ),
                drawerLabel: "Contacto",
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
                drawerLabel: "Cómo funciona",
              }}
            />

            <Drawer.Screen
              name="Datos seguros"
              component={SeguridadDatos}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={size}
                    color={color}
                  />
                ),
                drawerLabel: "Datos seguros",
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
                drawerLabel: "Descargo de responsabilidad",
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
                drawerLabel: "Política de Privacidad",
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
