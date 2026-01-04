import "react-native-reanimated"; // OBLIGATORIO: Primera línea
import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Share,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Tus componentes
import Contacto from "./componentes/Contacto";
import { PrincipalStack, PresentacionStack } from "./componentes/Navigation";
import DescargoResponsabilidad from "./componentes/DescargoResponsabilidad";
import SeguridadDatos from "./componentes/SeguridadDatos";
import PoliticaPrivacidad from "./componentes/PoliticaPrivacidad";
import { AuthProvider } from "./componentes/AuthContext";
import mobileAds from "react-native-google-mobile-ads";

enableScreens();

const Drawer = createDrawerNavigator();

/* =========================
   CONFIGURACIÓN GLOBAL
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
    const configurarCanal = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Recordatorios",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    configurarCanal();
  }, []);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => console.log("AdMob inicializado"));
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
