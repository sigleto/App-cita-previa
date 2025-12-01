import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PrincipalStack, PresentacionStack } from "./Navigation";
import Contacto from "./Contacto";
import SeguridadDatos from "./SeguridadDatos";
import DescargoResponsabilidad from "./DescargoResponsabilidad";
import PoliticaPrivacidad from "./PoliticaPrivacidad";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

// Componente Drawer custom para web
const CustomDrawerContent = ({ navigation }) => {
  const screens = [
    { name: "Inicio", component: PrincipalStack, icon: "home" },
    { name: "Contacto", component: Contacto, icon: "email" },
    { name: "Cómo funciona", component: PresentacionStack, icon: "information-outline" },
    { name: "Datos seguros", component: SeguridadDatos, icon: "lock-outline" },
    { name: "Responsabilidad", component: DescargoResponsabilidad, icon: "shield-alert-outline" },
    { name: "Política de Privacidad", component: PoliticaPrivacidad, icon: "file-document-outline" },
  ];

  return (
    <View style={styles.drawerContainer}>
      {screens.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          style={styles.drawerButton}
          onPress={() => navigation.navigate(screen.name)}
        >
          <MaterialCommunityIcons name={screen.icon} size={24} color="#007AFF" />
          <Text style={styles.drawerLabel}>{screen.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const AppDrawer = () => {
  if (Platform.OS === "web") {
    // Drawer simple para web
    const [currentScreen, setCurrentScreen] = useState("Inicio");
    const screens = {
      Inicio: <PrincipalStack />,
      Contacto: <Contacto />,
      "Cómo funciona": <PresentacionStack />,
      "Datos seguros": <SeguridadDatos />,
      Responsabilidad: <DescargoResponsabilidad />,
      "Política de Privacidad": <PoliticaPrivacidad />,
    };

    return (
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: 250, backgroundColor: "#f7f7f7" }}>
          {Object.keys(screens).map((name) => (
            <TouchableOpacity
              key={name}
              style={styles.drawerButton}
              onPress={() => setCurrentScreen(name)}
            >
              <Text style={styles.drawerLabel}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1 }}>{screens[currentScreen]}</View>
      </View>
    );
  }

  // Drawer estándar para móvil
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#f7f7f7" },
        drawerLabelStyle: { fontSize: 18, marginLeft: -10 },
        drawerActiveTintColor: "#007AFF",
        drawerInactiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Inicio" component={PrincipalStack} />
      <Drawer.Screen name="Contacto" component={Contacto} />
      <Drawer.Screen name="Cómo funciona" component={PresentacionStack} />
      <Drawer.Screen name="Datos seguros" component={SeguridadDatos} />
      <Drawer.Screen name="Responsabilidad" component={DescargoResponsabilidad} />
      <Drawer.Screen name="Política de Privacidad" component={PoliticaPrivacidad} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, padding: 20, backgroundColor: "#f7f7f7" },
  drawerButton: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  drawerLabel: { marginLeft: 10, fontSize: 18, color: "#007AFF" },
});
